/// <reference path="../.astro/types.d.ts" />

import type { Session } from '@/lib/auth';

declare global {
  namespace App {
    interface Locals {
      session?: Session;
    }
  }
}

export {};
