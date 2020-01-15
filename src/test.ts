import "zone.js/dist/zone-testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

declare const require: any;

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
<<<<<<< HEAD
=======

>>>>>>> 755f4f3... initialized angular, deleted unnecessary files and all comments
const context = require.context("./", true, /\.spec\.ts$/);
context.keys().map(context);
