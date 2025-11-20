import React from 'react';

export interface BadgeProps {
  leftText: string;
  rightText: string;
  color: string;
  icon?: React.ReactNode;
  href?: string;
  tooltip?: string;
}

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}