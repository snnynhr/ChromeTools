set ext=%CD%
set key=%CD%.pem 
set src=%CD%.crx
DEL ChromeTools.crx
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --pack-extension="%ext%" --pack-extension-key="%key%"
COPY "%src%" ChromeTools.crx /y