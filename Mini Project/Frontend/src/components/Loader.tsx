import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

const Loader = ({
  size = 'medium',
  color = 'blue-500',
  fullScreen = false,
  text
}: LoaderProps) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  };

  const spinner = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${sizeClasses[size]} rounded-full border-t-transparent border-${color} animate-spin mx-auto`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        {spinner}
        {text && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white font-medium"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {spinner}
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader; 