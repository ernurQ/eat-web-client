'use client'

import { useState } from 'react'
import { Button, Form, Input, Modal, Rate, message } from 'antd'
import { useParams } from 'next/navigation'

type ReviewFormValues = {
  content: string
  rating: number
}

export function ReviewModal() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()

  const handleSubmit = async (values: ReviewFormValues) => {
    try {
      setLoading(true)
      const response = await fetch(`/branches/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: values.content,
          rating: values.rating,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit review')

      message.success('Спасибо за ваш отзыв!')
      form.resetFields()
      setOpen(false)
    } catch {
      message.error('Что-то пошло не так. Пожалуйста, попробуйте снова.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
      >
        Оставить отзыв
      </Button>

      <Modal
        title="Оставить отзыв"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rating: 5 }}
        >
          <Form.Item
            name="rating"
            label="Оценка"
            rules={[{ required: true, message: 'Пожалуйста, поставьте оценку' }]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            name="message"
            label="Ваш отзыв"
            rules={[
              { required: true, message: 'Пожалуйста, напишите ваш отзыв' },
              { min: 10, message: 'Отзыв должен содержать минимум 10 символов' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Напишите ваш отзыв здесь..." />
          </Form.Item>

          <Form.Item className="text-right">
            <Button
              type="default"
              onClick={() => setOpen(false)}
              className="mr-2"
            >
              Отмена
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}