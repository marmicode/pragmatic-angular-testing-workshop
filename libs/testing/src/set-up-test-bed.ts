/// <reference types="vitest/globals" />

import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

declare global {
  const DEBUG_BROWSER: boolean | undefined;
}

export function setUpTestBed() {
  /* When debugging in the browser, we want to prevent Angular Testing Library
   * and TestBed from cleaning up after the test in order to interact with the browser.
   * Therefore, we disable Angular Testing Library clean up and forward the DEBUG_BROWSER
   * environment variable to move TestBed cleanup from afterEach to beforeEach. */
  const isDebugBrowserMode =
    typeof DEBUG_BROWSER !== 'undefined' && DEBUG_BROWSER;
  const lifecycleHook = isDebugBrowserMode ? beforeEach : afterEach;
  lifecycleHook(() => getTestBed().resetTestingModule());

  const testBed = getTestBed();
  if (testBed.platform) {
    return;
  }

  @NgModule({ providers: [provideZonelessChangeDetection()] })
  class TestModule {}

  testBed.initTestEnvironment(
    [BrowserTestingModule, TestModule],
    platformBrowserTesting(),
    {
      teardown: { destroyAfterEach: false },
    },
  );
}
