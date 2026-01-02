function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-4 border-gray-200" />
        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin [animation-duration:0.6s]" />
      </div>
    </div>
  );
}

export default Loading;
