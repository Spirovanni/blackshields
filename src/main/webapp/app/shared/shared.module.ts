import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BlackshieldsSharedLibsModule, BlackshieldsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BlackshieldsSharedLibsModule, BlackshieldsSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BlackshieldsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackshieldsSharedModule {
  static forRoot() {
    return {
      ngModule: BlackshieldsSharedModule
    };
  }
}
