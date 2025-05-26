import React from 'react'
const Testimonials = () => {
    return (
        <div>
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl sm:text-3xl font-semibold mb-12 tracking-wider text-center text-gray-800">
                        WHAT PEOPLE SAY ABOUT US
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "RenTour saved me hundreds when I needed a high-end laptop for a short project. The process was seamless!"
                            </p>
                            <p className="text-gray-800 font-medium">— Sarah K.</p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "As a frequent traveler, renting phones for different countries has been a game-changer. Highly recommend!"
                            </p>
                            <p className="text-gray-800 font-medium">— Michael T.</p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "The camera equipment I rented was in perfect condition and helped me complete my client project on budget."
                            </p>
                            <p className="text-gray-800 font-medium">— David R.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials