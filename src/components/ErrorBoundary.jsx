import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <h2 className="text-red-800 dark:text-red-200">Something went wrong</h2>
        <button 
          onClick={() => {
            this.setState({ hasError: false });
            window.location.reload();
          }}
          className="mt-2 text-red-600 dark:text-red-400"
        >
          Retry
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
