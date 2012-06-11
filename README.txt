
***** Getting Started *****

Download and install the Android SDK
-------------------------------------

Download SDK from 
http://developer.android.com/sdk/index.html

Next, untar the package
~$ tar -xvzf android-sdk_r18-linux.tgz


Setting up your PATH variable (Optional)
-----------------------------------------

In Ubuntu, you want to open your .bashrc file. A simple
~$ gedit ~/.bashrc

will open the file. Next, add the following line to the end of .bashrc
export ANDROID_HOME=(path-to-android-sdk [e.g. /home/suho/projects/photark/android-sdk-linux])
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools


Install Additional Android Developer Components (If any)
------------------------------------------------

Install via the Android SDK and AVD manager
~$ android


Creating an AVD
----------------
Run
~$ android avd

and Create an AVD having platform version >= 2.3.3

Install Cordova to local repo
-----------------------------

Run
~$ mvn install:install-file -Dfile=libs/cordova-1.8.0.jar -DgroupId=org.apache.cordova  -DartifactId=cordova -Dversion=1.8.0 -Dpackaging=jar

Deploy and run the app
----------------------

Start the AVD created
Run
~$ mvn clean install android:deploy



