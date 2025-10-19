import { useGetSettingByNameQuery } from '@/Redux/apis/settingApis';
import { Shield } from 'lucide-react';
import { Skeleton } from 'antd';

const Privacy = () => {
  const { data, isLoading } = useGetSettingByNameQuery('privacy');

  const content = data?.data?.desc || '';

  if (isLoading) {
    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we collect, use, and protect your information
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {content ? (
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Content Available
              </h3>
              <p className="text-gray-500">
                Privacy policy content will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
