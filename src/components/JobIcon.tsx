import React from 'react';
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Flame,
  Utensils,
  Smile,
  Bus,
  HardHat,
  FlaskConical,
  Palette,
  Mic,
  Trophy,
  Dog,
  Camera,
  Plane,
  Tractor,
  Fish,
  Flower2,
  Croissant,
  Hammer,
  HelpCircle,
  LucideProps
} from 'lucide-react';

interface JobIconProps extends LucideProps {
  name: string;
}

export const JobIcon: React.FC<JobIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Stethoscope':
      return <Stethoscope {...props} />;
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Smile':
      return <Smile {...props} />;
    case 'Bus':
      return <Bus {...props} />;
    case 'HardHat':
      return <HardHat {...props} />;
    case 'FlaskConical':
      return <FlaskConical {...props} />;
    case 'Palette':
      return <Palette {...props} />;
    case 'Mic':
      return <Mic {...props} />;
    case 'Trophy':
      return <Trophy {...props} />;
    case 'Dog':
      return <Dog {...props} />;
    case 'Camera':
      return <Camera {...props} />;
    case 'Plane':
      return <Plane {...props} />;
    case 'Tractor':
      return <Tractor {...props} />;
    case 'Fish':
      return <Fish {...props} />;
    case 'Flower2':
      return <Flower2 {...props} />;
    case 'Croissant':
      return <Croissant {...props} />;
    case 'Hammer':
      return <Hammer {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
