import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Memperbarui state agar render berikutnya menampilkan fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Anda juga bisa log error ke layanan pelaporan error
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Anda dapat merender fallback UI kustom apa pun
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Oops! Terjadi Kesalahan.</h1>
          <p className="text-lg mb-6">Maaf, ada yang tidak beres. Kami sedang berusaha memperbaikinya.</p>
          {/* Untuk debugging, Anda bisa menampilkan detail error */}
          {this.props.showErrorDetails && this.state.error && (
            <details className="mt-4 p-4 bg-red-100 rounded-lg text-left max-w-xl overflow-auto">
              <summary className="font-semibold cursor-pointer">Detail Error</summary>
              <pre className="whitespace-pre-wrap break-words text-sm mt-2">
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;