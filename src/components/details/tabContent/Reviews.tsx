import { useGetProductReviewsQuery, useCreateReviewMutation } from '@/Redux/apis/reviewApis';
import { Button, Form, Input, Rate, Avatar, Pagination, Empty, Card, message as antdMessage } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { imageUrl } from '@/Redux/baseApi';

const { TextArea } = Input;

interface ReviewsProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewsProps) => {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, isLoading, refetch } = useGetProductReviewsQuery({ productId, page, limit: 10 });
  const [createReview, { isLoading: submitting }] = useCreateReviewMutation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('product', productId);
      formData.append('review_for', 'PRODUCT');
      formData.append('rating', values.rating);
      formData.append('description', values.description);

      await createReview(formData).unwrap();
      antdMessage.success('Review submitted successfully!');
      form.resetFields();
      refetch();
    } catch (error: any) {
      antdMessage.error(error?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="py-6">
      {/* Average Rating Section */}
      {data?.totalReviews > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{data?.averageRating}</div>
              <Rate disabled value={data?.averageRating} className="text-2xl" />
              <div className="text-gray-600 mt-2">
                Based on {data?.totalReviews} {data?.totalReviews === 1 ? 'review' : 'reviews'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Review Form - Only if logged in */}
      {isLoggedIn ? (
        <Card className="mb-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: 'Please select a rating' }]}
            >
              <Rate className="text-2xl" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Your Review"
              rules={[{ required: true, message: 'Please write your review' }]}
            >
              <TextArea
                rows={4}
                placeholder="Share your experience with this product..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                size="large"
                className="w-full md:w-auto"
              >
                Submit Review
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <p className="text-center text-gray-700">
            Please <a href="/login" className="text-blue-600 font-semibold hover:underline">login</a> to write a review
          </p>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">
          Customer Reviews ({data?.totalReviews || 0})
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            {data.data.map((review: any) => (
              <Card key={review._id} className="hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <Avatar
                    size={48}
                    src={review.user?.img ? imageUrl(review.user.img) : undefined}
                    icon={!review.user?.img && <UserOutlined />}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{review.user?.name || 'Anonymous'}</h4>
                        <div className="flex items-center gap-2">
                          <Rate disabled value={review.rating} className="text-sm" />
                          <span className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{review.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={page}
                  total={data.pagination.total}
                  pageSize={data.pagination.limit}
                  onChange={setPage}
                  showSizeChanger={false}
                  showTotal={(total) => `Total ${total} reviews`}
                />
              </div>
            )}
          </>
        ) : (
          <Empty
            description="No reviews yet"
            className="py-12"
          >
            {isLoggedIn && (
              <p className="text-gray-600 mt-2">Be the first to review this product!</p>
            )}
          </Empty>
        )}
      </div>
    </div>
  );
};

export default Reviews;
