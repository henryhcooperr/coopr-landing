export interface WaitlistFormProps {
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
  isSubmitting: boolean;
}

export interface DemoFrameProps {
  active?: boolean;
  className?: string;
}
