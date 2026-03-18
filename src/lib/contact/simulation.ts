import { NextResponse } from 'next/server';
import { zepto } from './config';

interface SimulatedSuccessOptions {
  reason: string;
  devError?: string;
}

export function simulatedSuccessOrNull(
  opts: SimulatedSuccessOptions,
): NextResponse | null {
  if (!zepto.simulateSuccess) return null;

  console.warn(`⚠️  SIMULATION MODE: ${opts.reason}`);

  return NextResponse.json({
    success: true,
    message: `Simulated success (${opts.reason})`,
    ...(opts.devError ? { devError: opts.devError } : {}),
  });
}