export const StatCard = ({ value, unit, label }: { value: number; unit: string; label: string }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className="ml-1 text-xl text-gray-500">{unit}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{label}</p>
        </div>
    );
};