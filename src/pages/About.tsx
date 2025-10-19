import { useGetSettingByNameQuery } from '@/Redux/apis/settingApis';
import { Info } from 'lucide-react';
import { Skeleton } from 'antd';

const About = () => {
  const { data, isLoading } = useGetSettingByNameQuery('about');

  const content = data?.data?.desc || '';

  if (isLoading) {
    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
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
            <div className="bg-blue-100 p-4 rounded-full">
              <Info className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about our company and our mission
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
              <Info className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Content Available
              </h3>
              <p className="text-gray-500">
                About us content will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
