package com.shroomgrowth.plugins

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import com.facebook.react.bridge.*
import org.tensorflow.lite.DataType
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.TensorProcessor
import org.tensorflow.lite.support.common.ops.CastOp
import org.tensorflow.lite.support.image.ImageProcessor
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.image.ops.ResizeOp
import java.io.File
import java.lang.Exception
import java.net.URI
import kotlin.math.roundToInt

class TFLiteModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mNetModel: Interpreter? = null
    private var mConNetModel: Interpreter? = null

    private val imageProcessor = ImageProcessor.Builder()
        .add(ResizeOp(224, 224, ResizeOp.ResizeMethod.BILINEAR))
        .build()
    private val tensorProcessor = TensorProcessor.Builder()
        .add(CastOp(DataType.FLOAT32))
        .build()

    override fun getName(): String {
        return "TFLiteModule";
    }

    override fun invalidate() {
        mNetModel?.close()
        mConNetModel?.close()
        super.invalidate()
    }

    @ReactMethod
    fun isLoaded(): Boolean {
        return mNetModel != null && mConNetModel != null
    }

    @ReactMethod
    fun loadModels(mNetUri: String, mConNetUri: String, promise: Promise) {
        try {
            val mNetFile = File(URI(mNetUri))
            val mConNetFile = File(URI(mConNetUri))

            mNetModel = Interpreter(mNetFile)
            mConNetModel = Interpreter(mConNetFile)

            mNetModel!!.allocateTensors()
            mConNetModel!!.allocateTensors()

            promise.resolve("Models loaded successfully")
        }
        catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    @ReactMethod
    fun predictAllFromImage(imageUri: String, promise: Promise) {
        try {
            val imagePath = URI(imageUri).path
            val imageBitmap = BitmapFactory.decodeFile(imagePath)

            val result = predictAll(imageBitmap)
            promise.resolve(result)
        }
        catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    fun predictAll(imageBitmap: Bitmap): WritableNativeMap {
        val result = WritableNativeMap()

        var tensorImage = TensorImage.fromBitmap(imageBitmap)
        tensorImage = imageProcessor.process(tensorImage)

        val inputTensor = tensorProcessor.process(tensorImage.tensorBuffer)
        val inputBuffer = inputTensor.buffer

        val mNetOutput = Array(1) { FloatArray(16) { 0f } }
        val mConNetOutput = Array(1) { FloatArray(1) { 0f } }

        mNetModel?.run(inputBuffer, mNetOutput)
        mConNetModel?.run(inputBuffer, mConNetOutput)

        val day = mNetOutput[0].withIndex().maxByOrNull { it.value }!!.index
        val isContaminated = mConNetOutput[0][0].roundToInt() == 1

        result.putDouble("day", day.toDouble())
        result.putBoolean("contaminated", isContaminated)

        return result
    }
}