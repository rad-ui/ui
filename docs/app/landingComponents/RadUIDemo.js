'use client';

import { useState } from 'react';
import Card from '@radui/ui/Card';
import Button from '@radui/ui/Button';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Switch from '@radui/ui/Switch';
import Avatar from '@radui/ui/Avatar';
import Separator from '@radui/ui/Separator';
import ToggleGroup from '@radui/ui/ToggleGroup';
import Progress from '@radui/ui/Progress';
import { motion } from 'motion/react';

const RadUIDemo = () => {
  const [sliderValue, setSliderValue] = useState([450]);
  const [gpuCount, setGpuCount] = useState(8);
  const [wallpaperTinting, setWallpaperTinting] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [selectedSource, setSelectedSource] = useState('social');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[1400px] mx-auto p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-green-50 rounded-lg border border-gray-300 shadow-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Payment Method Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Payment Method</Heading>
            <Text className="text-gray-800 text-sm mb-4">All transactions are secure and encrypted</Text>
            
            <div className="space-y-4">
              <div>
                <Text className="text-sm text-gray-900 mb-1">Name on Card</Text>
                <input type="text" placeholder="Alex Johnson" className="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000" />
              </div>
              <div>
                <Text className="text-sm text-gray-900 mb-1">Card Number</Text>
                <input type="text" placeholder="4532 8765 4321 9876" className="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000" />
                <Text className="text-xs text-gray-700 mt-1">Enter your 16-digit number.</Text>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Text className="text-sm text-gray-900 mb-1">Month</Text>
                  <select defaultValue="mm" className="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000">
                    <option value="mm" disabled>MM</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                  </select>
                </div>
                <div>
                  <Text className="text-sm text-gray-900 mb-1">Year</Text>
                  <select defaultValue="yyyy" className="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000">
                    <option value="yyyy" disabled>YYYY</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>
              <div>
                <Text className="text-sm text-gray-900 mb-1">CVV</Text>
                <input type="password" placeholder="123" className="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000" />
              </div>
            </div>
          </Card>

          {/* Billing Address Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Billing Address</Heading>
            <Text className="text-gray-800 text-sm mb-4">The billing address associated with your payment method</Text>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={sameAsShipping} 
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="w-4 h-4 border border-gray-400 rounded text-green-900 focus:ring-green-900"
              />
              <Text className="text-sm">Same as shipping address</Text>
            </div>
          </Card>

          {/* Comments Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Comments</Heading>
            <textarea placeholder="Add any additional comments" className="w-full min-h-[100px] px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000 resize-none" />
          </Card>

          <div className="flex space-x-3">
            <Button color="green" variant="solid" className="flex-1">Submit</Button>
            <Button color="gray" variant="ghost" className="flex-1">Cancel</Button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Team Members Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <div className="text-center py-8">
              <div className="flex justify-center space-x-2 mb-4">
                <Avatar.Root>
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root>
                  <Avatar.Fallback>SM</Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root>
                  <Avatar.Fallback>AJ</Avatar.Fallback>
                </Avatar.Root>
              </div>
              <Heading as="h3" className="text-gray-1000 mb-2">No Team Members</Heading>
              <Text className="text-gray-800 text-sm mb-4">Invite your team to collaborate on this project.</Text>
              <Button color="blue" variant="outline">+ Invite Members</Button>
            </div>
          </Card>

          {/* Status Toggle Group */}
          <div className="flex space-x-2">
            <ToggleGroup.Root type="single" defaultValue="syncing">
              <ToggleGroup.Item value="syncing">Syncing</ToggleGroup.Item>
              <ToggleGroup.Item value="updating">Updating</ToggleGroup.Item>
              <ToggleGroup.Item value="loading">Loading</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {/* Message Input */}
          <div className="relative">
            <textarea placeholder="+ Send a message..." className="w-full px-3 py-2 pr-10 border border-gray-400 rounded-md bg-gray-200 text-gray-1000 resize-none" />
            <div className="absolute right-3 top-3 text-gray-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6S4.69 2 8 2s6 2.69 6 6-2.69 6-6 6z"/>
                <path d="M4 6h8v2H4zm0 3h8v2H4z"/>
              </svg>
            </div>
          </div>

          {/* Price Range Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Price Range</Heading>
            <Text className="text-gray-800 text-sm mb-4">Set your budget range ($200 - 800).</Text>
            <input 
              type="range" 
              value={sliderValue[0]} 
              onChange={(e) => setSliderValue([parseInt(e.target.value)])}
              min={200}
              max={800}
              step={50}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <Text className="text-sm text-gray-700 mt-2 text-center">${sliderValue[0]}</Text>
          </Card>

          {/* Search Input */}
          <div className="relative">
            <input type="text" placeholder="Q Search..." className="w-full px-3 py-2 pr-20 border border-gray-400 rounded-md bg-gray-200 text-gray-1000" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">12 results</div>
          </div>

          {/* URL Input */}
          <div className="relative">
            <input type="url" placeholder="https://example.com" className="w-full px-3 py-2 pr-8 border border-gray-400 rounded-md bg-gray-200 text-gray-1000" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-600">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11V5h2v6H7zm1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
            </div>
          </div>

          {/* Chat Input */}
          <div className="relative">
            <textarea placeholder="Ask, Search or Chat..." className="w-full px-3 py-2 pr-24 border border-gray-400 rounded-md bg-gray-200 text-gray-1000 resize-none" />
            <div className="absolute right-3 top-3 flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="h-6 text-xs">+ Auto</Button>
              <Text className="text-xs text-gray-600">52% used</Text>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-gray-600">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"/>
              </svg>
            </div>
          </div>

          {/* Two-factor Authentication Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Two-factor authentication</Heading>
            <Text className="text-gray-800 text-sm mb-4">Verify via email or phone number.</Text>
            <Button color="green" variant="outline">Enable</Button>
          </Card>

          {/* Profile Status */}
          <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-green-900">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <Text className="text-sm text-gray-900">Your profile has been verified.</Text>
          </div>

          <Separator />

          <Text className="text-sm font-semibold text-gray-900">Appearance Settings</Text>

          {/* Compute Environment Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Compute Environment</Heading>
            <Text className="text-gray-800 text-sm mb-4">Select the compute environment for your cluster.</Text>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input type="radio" name="compute" value="kubernetes" id="k8s" defaultChecked className="mt-1 w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="k8s" className="flex-1 cursor-pointer">
                  <Text className="font-medium text-gray-1000">Kubernetes</Text>
                  <Text className="text-sm text-gray-800">Run GPU workloads on a K8s configured cluster. This is the default.</Text>
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <input type="radio" name="compute" value="vm" id="vm" className="mt-1 w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="vm" className="flex-1 cursor-pointer">
                  <Text className="font-medium text-gray-1000">Virtual Machine</Text>
                  <Text className="text-sm text-gray-800">Access a VM configured cluster to run workloads. (Coming soon)</Text>
                </label>
              </div>
            </div>
          </Card>

          {/* Number of GPUs Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">Number of GPUs</Heading>
            <div className="flex items-center space-x-3">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setGpuCount(Math.max(1, gpuCount - 1))}
              >
                -
              </Button>
              <input 
                type="number" 
                value={gpuCount} 
                onChange={(e) => setGpuCount(Math.max(1, Math.min(32, parseInt(e.target.value) || 1)))} 
                min={1} 
                max={32}
                className="w-20 px-3 py-2 text-center border border-gray-400 rounded-md bg-gray-200 text-gray-1000"
              />
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setGpuCount(Math.min(32, gpuCount + 1))}
              >
                +
              </Button>
            </div>
            <Text className="text-sm text-gray-700 mt-2">You can add more later.</Text>
          </Card>

          {/* Wallpaper Tinting Switch */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-md">
            <Text className="text-sm font-medium text-gray-1000">Wallpaper Tinting</Text>
            <Switch.Root checked={wallpaperTinting} onCheckedChange={setWallpaperTinting}>
              <Switch.Thumb />
            </Switch.Root>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Context Input Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <textarea placeholder="Ask, search, or make anything..." className="w-full min-h-[120px] px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000 resize-none" />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11V5h2v6H7zm1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                </Button>
                <Button size="sm" variant="ghost">Auto</Button>
                <Button size="sm" variant="ghost">All Sources</Button>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-600">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"/>
              </svg>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M10 12L6 8l4-4v8z"/>
              </svg>
            </Button>
            <Button size="sm" variant="ghost">Archive</Button>
            <Button size="sm" variant="ghost">Report</Button>
            <Button size="sm" variant="ghost">Snooze</Button>
            <Button size="sm" variant="ghost">⋯</Button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <input 
              type="checkbox" 
              checked={agreedToTerms} 
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 border border-gray-400 rounded text-green-900 focus:ring-green-900"
            />
            <Text className="text-sm">I agree to the terms and conditions</Text>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-md">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">‹</Button>
              <Button size="sm" variant="solid">1</Button>
              <Button size="sm" variant="ghost">2</Button>
              <Button size="sm" variant="ghost">3</Button>
              <Button size="sm" variant="ghost">›</Button>
            </div>
            <select defaultValue="copilot" className="w-24 px-3 py-2 border border-gray-400 rounded-md bg-gray-200 text-gray-1000">
              <option value="copilot">Copilot</option>
              <option value="assistant">Assistant</option>
            </select>
          </div>

          {/* Survey Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <Heading as="h3" className="text-gray-1000 mb-2">How did you hear about us?</Heading>
            <Text className="text-gray-800 text-sm mb-4">Select the option that best describes how you discovered Rad UI.</Text>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" name="source" value="social" id="social" checked={selectedSource === 'social'} onChange={(e) => setSelectedSource(e.target.value)} className="w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="social" className="cursor-pointer">
                  <Text className="text-sm">Social Media</Text>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="source" value="search" id="search" checked={selectedSource === 'search'} onChange={(e) => setSelectedSource(e.target.value)} className="w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="search" className="cursor-pointer">
                  <Text className="text-sm">Search Engine</Text>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="source" value="referral" id="referral" checked={selectedSource === 'referral'} onChange={(e) => setSelectedSource(e.target.value)} className="w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="referral" className="cursor-pointer">
                  <Text className="text-sm">Referral</Text>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="source" value="other" id="other" checked={selectedSource === 'other'} onChange={(e) => setSelectedSource(e.target.value)} className="w-4 h-4 border border-gray-400 text-green-900 focus:ring-green-900" />
                <label htmlFor="other" className="cursor-pointer">
                  <Text className="text-sm">Other</Text>
                </label>
              </div>
            </div>
          </Card>

          {/* Processing Card */}
          <Card className="p-6 bg-gray-50 border border-gray-300">
            <div className="flex flex-col items-center justify-center py-8">
            <Progress.Root value={65} maxValue={100} minValue={0} className="w-16 h-16 mb-4">
              <Progress.Indicator />
            </Progress.Root>
              <Heading as="h3" className="text-gray-1000 mb-2">Processing your request</Heading>
              <Text className="text-gray-800 text-sm mb-4 text-center">Please wait while we process your request. Do not refresh the page.</Text>
              <Button color="gray" variant="ghost">Cancel</Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default RadUIDemo;

