package com.test;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.support.annotation.Nullable;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.bridge.ReadableArray;

public class ReactImageManager extends SimpleViewManager <ReactImageView> {
    public static final String REACT_CLASS = "RCTDDImageView";


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ReactImageView createViewInstance(ThemedReactContext context) {
        return new ReactImageView(context, Fresco.newDraweeControllerBuilder(), null,null);
    }

    @ReactProp(name = "src")
    public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
        view.setSource(sources);
    }

    @ReactProp(name = "borderRadius", defaultFloat = 0f)
    public void setBorderRadius(ReactImageView view, float borderRadius) {
        view.setBorderRadius(borderRadius);
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }
}


