rmdir build /S /Q
mkdir build
CD build/
mkdir icons
mkdir js
mkdir skin
CD skin
mkdir fonts
CD ..
mkdir util
CD ..
XCOPY icons build\icons /Y
XCOPY util\jquery.min.js build\util
XCOPY skin\fonts\RobotoCondensed-Bold.ttf build\skin\fonts
XCOPY skin\fonts\RobotoCondensed-Regular.ttf build\skin\fonts
XCOPY skin\fonts\LondonBetween.ttf build\skin\fonts
XCOPY skin\popup.png build\skin
XCOPY skin\background.png build\skin
XCOPY skin\background-main.png build\skin
XCOPY background.html build
XCOPY manifest.json build
XCOPY options.html build
XCOPY popup.html build
XCOPY README.md build
call compile\minifycss.bat
call compile\minifyjs.bat
call compile\update_crx.bat
call compile\zip.bat