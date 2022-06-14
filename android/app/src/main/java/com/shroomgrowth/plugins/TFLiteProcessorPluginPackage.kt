package com.shroomgrowth.plugins

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.ArrayList
import com.shroomgrowth.plugins.TFLiteModule
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin
import com.shroomgrowth.plugins.TFLiteProcessorPlugin

class TFLiteProcessorPluginPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val tfLiteModule = TFLiteModule(reactContext)

        FrameProcessorPlugin.register(TFLiteProcessorPlugin(tfLiteModule, reactContext))
        return arrayListOf(tfLiteModule)
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}