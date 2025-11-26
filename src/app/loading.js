import Spinner from '../components/ui/Spinner';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="">
                <Spinner size={64} />
            </div>
        </div>
    );
}
