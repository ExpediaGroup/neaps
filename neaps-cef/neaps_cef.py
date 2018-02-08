# Tutorial example. Doesn't depend on any third party GUI framework.
# Tested with CEF Python v56.2+

from cefpython3 import cefpython as cef
import platform
import sys
import threading
import os
import socket
import numpy as np
from socketserver import ThreadingMixIn
from http.server import SimpleHTTPRequestHandler, HTTPServer
from neaps_lib.functions import analyze_data, collect_data

class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
  pass

def check_versions():
  print("[neaps-cef.py] CEF Python {ver}".format(ver=cef.__version__))
  print("[neaps-cef.py] Python {ver} {arch}".format(
        ver=platform.python_version(), arch=platform.architecture()[0]))
  assert cef.__version__ >= "56.2", "CEF Python v56.2+ required to run this"

def get_open_port():
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.bind(("",0))
  s.listen(1)
  port = s.getsockname()[1]
  s.close()
  return port

def build_url(host, port):
  return "http://%s:%s" % (host, port)

def run_http_server():
  server = ThreadingSimpleServer(('0.0.0.0', PORT), SimpleHTTPRequestHandler)
  print("Serving HTTP traffic from", CWD, "on", HOST, "using port", PORT)

  ip, port = server.server_address

  # Start a thread with the server -- that thread will then start one
  # more thread for each request
  server_thread = threading.Thread(target=server.serve_forever)
  # Exit the server thread when the main thread terminates
  server_thread.daemon = True
  server_thread.start()
  print("Server loop running in thread:", server_thread.name)

def get_data(data, js_callback=None):
  """ Collect Data trough standard functions """
  predstot = int(data['predstot'])
  runstot = int(data['runstot'])
  fun = int(data['fun'])

  chunksin = data['chunks']

  for chunk in chunksin:
      chunk['sample'] = [np.float64(x) for x in chunk['sample'].split(',')]
      chunk['wip'] = int(chunk['wip'])
      chunk['runsdim'] = int(chunk['runsdim'])
      chunk['td_low_bound'] = float(chunk['td_low_bound'])
      chunk['td_high_bound'] = float(chunk['td_high_bound'])

  simulations = collect_data(predstot, runstot, chunksin, fun)
  simulations = analyze_data(simulations, 3, [55., 75., 95.])

  if js_callback:
      js_callback.Call(simulations)

  return simulations

def main():
  check_versions()

  run_http_server()
  
  sys.excepthook = cef.ExceptHook  # To shutdown all CEF processes on error
  # To change user agent use either "product_version"
  # or "user_agent" options. Explained in Tutorial in
  # "Change user agent string" section.
  settings = {
      # "product_version": "MyProduct/10.00",
      # "user_agent": "MyAgent/20.00 MyProduct/10.00",
  }
  cef.Initialize(settings=settings)
#  set_global_handler()
  browser = cef.CreateBrowserSync(url=build_url(HOST, PORT),
                                  window_title="Neaps")
#  set_client_handlers(browser)
  set_javascript_bindings(browser)
  cef.MessageLoop()
  cef.Shutdown()

# def html_to_data_uri(html, js_callback=None):
#   # This function is called in two ways:
#   # 1. From Python: in this case value is returned
#   # 2. From Javascript: in this case value cannot be returned because
#   #    inter-process messaging is asynchronous, so must return value
#   #    by calling js_callback.
#   html = html.encode("utf-8", "replace")
#   b64 = base64.b64encode(html).decode("utf-8", "replace")
#   ret = "data:text/html;base64,{data}".format(data=b64)
#   if js_callback:
#       js_print(js_callback.GetFrame().GetBrowser(),
#                 "Python", "html_to_data_uri",
#                 "Called from Javascript. Will call Javascript callback now.")
#       js_callback.Call(ret)
#   else:
#       return ret


# def set_global_handler():
#   # A global handler is a special handler for callbacks that
#   # must be set before Browser is created using
#   # SetGlobalClientCallback() method.
#   global_handler = GlobalHandler()
#   cef.SetGlobalClientCallback("OnAfterCreated",
#                               global_handler.OnAfterCreated)


# def set_client_handlers(browser):
#   client_handlers = [LoadHandler(), DisplayHandler()]
#   for handler in client_handlers:
#       browser.SetClientHandler(handler)


def set_javascript_bindings(browser):
  #external = External(browser)
  bindings = cef.JavascriptBindings(
          bindToFrames=False, bindToPopups=False)
  # bindings.SetProperty("python_property", "This property was set in Python")
  # bindings.SetProperty("cefpython_version", cef.GetVersion())
  bindings.SetProperty("get_data_available", True)
  bindings.SetFunction("get_data", get_data)
  # bindings.SetObject("external", external)
  browser.SetJavascriptBindings(bindings)


# def js_print(browser, lang, event, msg):
#   # Execute Javascript function "js_print"
#   browser.ExecuteFunction("js_print", lang, event, msg)


# class GlobalHandler(object):
#   def OnAfterCreated(self, browser, **_):
#     """Called after a new browser is created."""
#     # DOM is not yet loaded. Using js_print at this moment will
#     # throw an error: "Uncaught ReferenceError: js_print is not defined".
#     # We make this error on purpose. This error will be intercepted
#     # in DisplayHandler.OnConsoleMessage.
#     js_print(browser, "Python", "OnAfterCreated",
#               "This will probably never display as DOM is not yet loaded")
#     # Delay print by 0.5 sec, because js_print is not available yet
#     args = [browser, "Python", "OnAfterCreated",
#             "(Delayed) Browser id="+str(browser.GetIdentifier())]
#     threading.Timer(0.5, js_print, args).start()


# class LoadHandler(object):
#   def OnLoadingStateChange(self, browser, is_loading, **_):
#     """Called when the loading state has changed."""
#     if not is_loading:
#       # Loading is complete. DOM is ready.
#       js_print(browser, "Python", "OnLoadingStateChange",
#                 "Loading is complete")


# class DisplayHandler(object):
#   def OnConsoleMessage(self, browser, message, **_):
#     """Called to display a console message."""
#     # This will intercept js errors, see comments in OnAfterCreated
#     if "error" in message.lower() or "uncaught" in message.lower():
#       # Prevent infinite recurrence in case something went wrong
#       if "js_print is not defined" in message.lower():
#         if hasattr(self, "js_print_is_not_defined"):
#           print("Python: OnConsoleMessage: "
#                 "Intercepted Javascript error: "+message)
#           return
#         else:
#             self.js_print_is_not_defined = True
#       # Delay print by 0.5 sec, because js_print may not be
#       # available yet due to DOM not ready.
#       args = [browser, "Python", "OnConsoleMessage",
#         "(Delayed) Intercepted Javascript error: <i>{error}</i>"
#         .format(error=message)]
#       threading.Timer(0.5, js_print, args).start()


# class External(object):
#   def __init__(self, browser):
#     self.browser = browser

#   def test_multiple_callbacks(self, js_callback):
#     """Test both javascript and python callbacks."""
#     js_print(self.browser, "Python", "test_multiple_callbacks",
#         "Called from Javascript. Will call Javascript callback now.")

#     def py_callback(msg_from_js):
#       js_print(self.browser, "Python", "py_callback", msg_from_js)
#     js_callback.Call("String sent from Python", py_callback)


if __name__ == '__main__':
  HOST = socket.gethostname()
  PORT= get_open_port()

  if getattr(sys, 'frozen', False):
      # frozen
      CWD = os.path.dirname(sys.executable)
  else:
      # unfrozen
      CWD = os.path.dirname(os.path.realpath(__file__))

  #CWD = os.getcwd()

  os.chdir(CWD)
  os.chdir("web")

  main()
