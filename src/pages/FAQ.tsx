import { useGetAllFaqsQuery } from '@/Redux/apis/faqApis';
import { HelpCircle } from 'lucide-react';
import { Collapse, Skeleton } from 'antd';
import type { CollapseProps } from 'antd';
import styles from './FAQ.module.css';
import SEO from '@/components/SEO';

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const { data, isLoading } = useGetAllFaqsQuery({});

  const faqs: FAQItem[] = data?.data || [];

  // Convert FAQs to Ant Design Collapse items
  const collapseItems: CollapseProps['items'] = faqs.map((faq, index) => ({
    key: index.toString(),
    label: <span className="text-lg font-semibold text-gray-900">{faq.question}</span>,
    children: (
      <div className="pt-2 border-t border-gray-100">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pt-3">{faq.answer}</p>
      </div>
    ),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <HelpCircle className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
          </div>
          <Skeleton active paragraph={{ rows: 4 }} />
          <Skeleton active paragraph={{ rows: 4 }} className="mt-4" />
          <Skeleton active paragraph={{ rows: 4 }} className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Frequently Asked Questions | Find Answers to Common Questions"
        description="Get answers to common questions about our products, services, shipping, returns, and more. Browse our FAQ section for quick solutions to your queries."
        keywords="FAQ, frequently asked questions, help center, customer support, common questions, product information, shipping info, return policy, order status, account help"
      />
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <HelpCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, products, and policies.
          </p>
        </div>

        {/* FAQ List */}
        {faqs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No FAQs Available
            </h3>
            <p className="text-gray-500">
              Check back soon for frequently asked questions.
            </p>
          </div>
        ) : (
          <Collapse
            items={collapseItems}
            bordered={false}
            expandIconPosition="end"
            className={styles.faqCollapse}
            style={{
              backgroundColor: 'transparent',
            }}
            size="large"
            defaultActiveKey={['0']}
          />
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-blue-100 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
