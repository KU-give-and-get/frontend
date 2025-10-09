import { Mail, Instagram, Facebook, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ติดต่อเรา
          </h1>
          <p className="text-sm text-gray-600">
            มีคำถามหรือข้อสงสัย? เราพร้อมให้ความช่วยเหลือคุณ ติดต่อเราผ่านช่องทางด้านล่าง
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email Card */}
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">อีเมล</h3>
              <p className="text-gray-600 text-sm mb-1">support@example.com</p>
              <p className="text-gray-600 text-sm">info@example.com</p>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Instagram</h3>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">@yourusername</a>
            </div>
          </div>

          {/* Facebook Card */}
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Facebook className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Facebook</h3>
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">@yourpage</a>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">เวลาทำการ</h3>
              <p className="text-gray-600 text-sm mb-1">จันทร์ - ศุกร์: 9:00 - 18:00</p>
              <p className="text-gray-600 text-sm">เสาร์ - อาทิตย์: 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;