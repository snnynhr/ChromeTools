set ext=%CD%
set key=%CD%.pem
DEL BrowserTools.crx
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --pack-extension="%ext%\build" --pack-extension-key="%key%"
rename "%CD%\build.crx" BrowserTools.crx
