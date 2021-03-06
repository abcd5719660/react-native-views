package nell.jinxian;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import nell.jinxian.listview.RecyclerViewBackedScrollViewManager;
import nell.jinxian.listview.RecyclerViewItemViewManager;

public class RCTViewsPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new RCTViewsModule(reactContext));

    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new RecyclerViewBackedScrollViewManager(),
      new RecyclerViewItemViewManager()
    );
  }
}
