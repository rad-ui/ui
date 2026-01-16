'use client';

import { Check, X, AlertCircle, Minus } from 'lucide-react';

export const CheckIcon = () => <Check className="w-4 h-4 inline-block text-green-900" />;
export const XIcon = () => <X className="w-4 h-4 inline-block text-gray-600" />;
export const HighPriorityIcon = () => <AlertCircle className="w-4 h-4 inline-block text-red-600" />;
export const MediumPriorityIcon = () => <AlertCircle className="w-4 h-4 inline-block text-yellow-600" />;
export const DashIcon = () => <Minus className="w-4 h-4 inline-block text-gray-400" />;

