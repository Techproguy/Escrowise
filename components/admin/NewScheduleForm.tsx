'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Mail, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
  report_type: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string;
  parameters: {
    start_date?: string;
    end_date?: string;
    filters?: Record<string, any>;
  };
};

export default function NewScheduleForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const reportTypes = [
    { value: 'dispute_analysis', label: 'Dispute Analysis' },
    { value: 'user_activity', label: 'User Activity' },
    { value: 'revenue_analysis', label: 'Revenue Analysis' },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      // Convert recipients string to array
      const recipientsArray = data.recipients
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);

      const response = await fetch('/api/admin/reports/scheduled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recipients: recipientsArray,
        }),
      });

      if (response.ok) {
        toast.success('Report schedule created successfully');
        reset();
        setOpen(false);
        onSuccess();
      } else {
        throw new Error('Failed to create schedule');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Schedule New Report
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report_type">Report Type</Label>
              <Select {...register('report_type', { required: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.report_type && (
                <p className="text-sm text-red-500">Report type is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select {...register('frequency', { required: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              {errors.frequency && (
                <p className="text-sm text-red-500">Frequency is required</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                id="recipients"
                placeholder="comma-separated emails"
                {...register('recipients', { required: true })}
              />
            </div>
            {errors.recipients && (
              <p className="text-sm text-red-500">At least one recipient is required</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input type="time" defaultValue="09:00" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
