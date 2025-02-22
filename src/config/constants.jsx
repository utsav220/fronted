export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_GUEST = "ROLE_GUEST";
export const INSTRUCTIONS = {
  showInstructions: false,
  getContent: () => (
    <div className="bg-white mt-4 p-6 rounded-xl border border-gray-200 shadow-lg">
  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 ">
    <span>🔹</span> How It Works
  </h2>

  <ul className="mt-4 space-y-3 text-gray-700">
    {[
      "Type the Job Description in the left panel.",
      "Attach your resume.",
      "Add any additional notes (optional).",
      'Click the <span class="text-blue-600 font-medium">"Analyze"</span> button.'
    ].map((step, index) => (
      <li key={index} className="flex items-start gap-2">
        <span className="font-semibold text-gray-900">Step {index + 1}:</span>
        <span dangerouslySetInnerHTML={{ __html: step }} />
      </li>
    ))}
  </ul>

  <p className="mt-6 text-gray-800 leading-relaxed">
    Once analyzed, the right panel will display <strong>questions and answers</strong> based on the Job Description and Resume.  
    The left panel will highlight <strong>Matching Areas, Missing Areas, and Additional Notes</strong> for better insights.
  </p>
</div>

  ),
};
