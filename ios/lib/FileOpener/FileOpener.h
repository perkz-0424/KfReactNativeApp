#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTBridge.h>

@import UIKit;

@interface FileOpener : NSObject <RCTBridgeModule>
@property (nonatomic) UIDocumentInteractionController * FileOpener;
@end
