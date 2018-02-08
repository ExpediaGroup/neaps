from cx_Freeze import setup, Executable

# Dependencies are automatically detected, but it might need
# fine tuning.
buildOptions = dict(
    packages = [
                "wx",
                "cefpython3",
                "numpy",
                ], 
    include_files = [
                    ("web", "web"),
                    ("neaps_lib", "neaps_lib")
                    ],
    optimize = 2,
    )

bdistMacOptions = {
    "include_frameworks": ['Chromium Embedded Framework.framework']
}

import sys
base = 'Win32GUI' if sys.platform=='win32' else None

executables = [
    Executable('neaps_wx.py',
                base=base,
                targetName = 'neaps_wx.py')
]

setup(name='Neaps',
      version = '1.0',
      description = 'a simulator to forecast the end of agile project basing on historical data and using montecarlo simulations',
      options = dict(build_exe = buildOptions, bdistMacOptions = bdistMacOptions),
      executables = executables)
