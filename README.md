# Easy Installer

This application is designed to provide a quick and easy way to install a variety of applications on Windows without having to download them manually.

Easy Installer uses [winget](https://github.com/microsoft/winget-cli) to download packages from their sources automatically.
If a package hasn't been uploaded to winget, but exists on the microsoft store, winget can automatically install that application using the store.
