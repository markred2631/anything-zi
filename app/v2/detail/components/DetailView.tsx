interface DetailViewProps {
  selectedResult: ResultItem;
  onClose: () => void;
}

export default function DetailView({ selectedResult, onClose }: DetailViewProps) {
  return (
    <div className="w-full p-6 bg-white border-gray-200 animate-slideIn rounded-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800 animate-fadeIn">{selectedResult.title}</h2>
          <div className="flex items-center gap-3 animate-fadeIn">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {selectedResult.date}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close detail view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-6 animate-fadeIn animation-delay-100">{selectedResult.description}</p>
      </div>

      <div className="space-y-6 animate-fadeIn animation-delay-200">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Information</h3>
          <div className="prose text-gray-700 leading-relaxed">
            {selectedResult.details}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Item ID</h4>
            <p className="text-gray-600 font-mono">{selectedResult.id}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Release Date</h4>
            <p className="text-gray-600">{selectedResult.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};