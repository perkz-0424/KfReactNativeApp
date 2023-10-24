#import "FileOpener.h"
#import <Foundation/Foundation.h>

@implementation FileOpener

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(FileOpener);

RCT_REMAP_METHOD(open, filePath:(NSString *)filePath fileMine:(NSString *)fileMine fromRect:(CGRect)rect
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSURL *fileURL = [NSURL fileURLWithPath:filePath];
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if(![fileManager fileExistsAtPath:fileURL.path]) {
        NSError *error = [NSError errorWithDomain:@"文件没找到" code:404 userInfo:nil];
        reject(@"文件没找到", @"文件没找到", error);
        return;
    }
    
    self.FileOpener = [UIDocumentInteractionController interactionControllerWithURL:fileURL];
    self.FileOpener.delegate = (id)self;
    
    UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    
    BOOL wasOpened = [self.FileOpener presentOpenInMenuFromRect:ctrl.view.bounds inView:ctrl.view animated:YES];
        
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
    {
        wasOpened = [self.FileOpener presentOptionsMenuFromRect:rect inView:ctrl.view animated:YES];
    }
    
    if (wasOpened) {
        resolve(@"打开成功");
    } else {
        NSError *error = [NSError errorWithDomain:@"打开失败" code:500 userInfo:nil];
        reject(@"打开失败", @"打开失败", error);
    }
    
}

@end
