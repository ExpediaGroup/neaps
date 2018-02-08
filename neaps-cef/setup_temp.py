import sys
from cx_Freeze import setup, Executable

# Dependencies are automatically detected, but it might need fine tuning.
build_exe_options = {"packages": [
                         "wx",
                         "cefpython3",
                         "numpy",
                         ],
                     "include_files":[
                         ("web", "web"),
                         ("neaps_lib", "neaps_lib")
                         ],
                     "optimize": 2,
                     "include_msvcr": True,
                     }

# GUI applications require a different base on Windows (the default is for a
# console application).
base = None

if sys.platform == "win32":
    base = "Win32GUI"

setup(  name = "neaps",
        version = "1.0",
        description = "My GUI application!",
        options = {"build_exe": build_exe_options},
        executables = [Executable("neaps_wx.py", base=base, icon="icon.ico")])