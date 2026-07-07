import React, { useState } from 'react';
import { BookOpen, X, Sparkles, CheckCircle, Lightbulb, AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface PageBannerProps {
  icon: React.ElementType;
  title: string;
  description: string;
  backButton?: boolean;
  onBack?: () => void;
}

// Vietnamese CX Expert Guide content map based on title keywords
const getGuideContent = (title: string) => {
  const t = title.toLowerCase();
  
  if (t.includes('bảng điều khiển') || t.includes('dashboard') || t.includes('tổng quan')) {
    return {
      title: 'Cẩm nang Quản trị Dashboard & Chỉ số CX hiệu quả',
      subtitle: 'Tối ưu hóa tầm nhìn vận hành thời gian thực cho CX Leader',
      sections: [
        {
          icon: Lightbulb,
          title: 'Điểm chạm cốt lõi (Core Touchpoint)',
          content: 'Dashboard không chỉ là nơi nhìn số liệu vô hồn. Đây là trung tâm chỉ huy giúp bạn phát hiện sớm các "điểm nghẽn" (bottlenecks) trong hành trình khách hàng. Hãy chú ý đặc biệt đến SLA giải quyết và CSAT theo thời gian thực.'
        },
        {
          icon: Sparkles,
          title: 'Chiến thuật vận hành từ Chuyên gia',
          content: 'Nếu tỷ lệ quá hạn SLA tăng quá 5%, hãy kiểm tra ngay biểu đồ phân bổ vé theo kênh. Thường nguyên nhân gốc rễ nằm ở sự bất đối xứng nguồn lực giữa kênh Chat trực tuyến và kênh Email.'
        },
        {
          icon: AlertTriangle,
          title: 'Lời khuyên quản trị rủi ro',
          content: 'Đừng để bị đánh lừa bởi điểm CSAT trung bình cao. Hãy lọc riêng nhóm khách hàng đánh giá 1-2 sao (Detractors) để chủ động liên hệ hỗ trợ bù đắp trải nghiệm trong vòng 2 giờ.'
        }
      ]
    };
  }
  
  if (t.includes('phiếu') || t.includes('ticket')) {
    return {
      title: 'Nghệ thuật xử lý Phiếu hỗ trợ & Quản trị Khủng hoảng',
      subtitle: 'Biến khiếu nại gay gắt thành cơ hội giữ chân khách hàng',
      sections: [
        {
          icon: Lightbulb,
          title: 'Nguyên tắc Vàng: Thừa nhận & Đồng cảm',
          content: 'Khách hàng không mua giải pháp trước khi họ cảm thấy được thấu hiểu. Thừa nhận sai sót hoặc sự bất tiện ngay trong 3 dòng đầu tiên của phản hồi. Sử dụng ngôn từ chân thành, tránh văn phong máy móc.'
        },
        {
          icon: Sparkles,
          title: 'Kịch bản Crisis Management (Win-Win)',
          content: 'Khi gặp sự cố nghiêm trọng, kích hoạt ngay quy trình xử lý khủng hoảng. Giao việc cho đúng Agent có kỹ năng đàm phán thương lượng tốt nhất. Đề xuất phương án đền bù hợp lý trước khi khách hàng yêu cầu.'
        },
        {
          icon: AlertTriangle,
          title: 'Tối ưu hóa Định tuyến thông minh',
          content: 'Định tuyến vé dựa trên thế mạnh của Agent (Skill-based routing) giúp giảm thời gian giải quyết (AHT) tới 30%. Đừng để khách hàng bị chuyển tiếp qua quá nhiều phòng ban.'
        }
      ]
    };
  }

  if (t.includes('khách hàng') || t.includes('crm') || t.includes('quản trị khách hàng')) {
    return {
      title: 'Chiến lược thấu hiểu Khách hàng 360 độ',
      subtitle: 'Cá nhân hóa trải nghiệm dựa trên dữ liệu hành vi sâu sắc',
      sections: [
        {
          icon: Lightbulb,
          title: 'Xây dựng chân dung khách hàng 360°',
          content: 'Tận dụng các trường tùy chỉnh (Custom Fields) để ghi nhận không chỉ thông tin liên hệ, mà còn là sở thích cá nhân, lịch sử phàn nàn và thói quen giao tiếp của họ.'
        },
        {
          icon: Sparkles,
          title: 'Phân khúc khách hàng thông minh',
          content: 'Tự động gắn thẻ (Tag) khách hàng VIP để kích hoạt cơ chế ưu tiên xử lý vé. Thiết kế điểm chạm đặc quyền để biến khách hàng trung thành thành đại sứ thương hiệu tự nhiên.'
        },
        {
          icon: AlertTriangle,
          title: 'Bảo mật & Tôn trọng quyền riêng tư',
          content: 'Trải nghiệm xuất sắc bắt đầu từ sự tin cậy. Đảm bảo dữ liệu khách hàng được phân quyền truy cập chặt chẽ theo vai trò (RBAC) của Agent.'
        }
      ]
    };
  }

  if (t.includes('báo cáo') || t.includes('analytics') || t.includes('phân tích')) {
    return {
      title: 'Giải mã Tiếng nói Khách hàng (Voice of Customer - VoC)',
      subtitle: 'Trích xuất insight đắt giá để cải tiến quy trình liên tục',
      sections: [
        {
          icon: Lightbulb,
          title: 'Vượt qua bẫy con số trung bình',
          content: 'Điểm CSAT 90% trông rất đẹp, nhưng 10% khách hàng không hài lòng mới là nơi chứa đựng các bài học cải tiến lớn nhất. Hãy phân tích sâu nhóm 10% này để tìm ra lỗ hổng sản phẩm.'
        },
        {
          icon: Sparkles,
          title: 'Phân tích nguyên nhân gốc rễ (RCA)',
          content: 'Sử dụng mô hình "5 Whys" kết hợp dữ liệu thống kê để tìm ra lý do thực sự đằng sau việc lượng vé một chủ đề tăng đột biến. Báo cáo lại cho phòng phát triển sản phẩm để giải quyết triệt để.'
        },
        {
          icon: AlertTriangle,
          title: 'Đo lường năng suất Agent công bằng',
          content: 'Đánh giá Agent dựa trên bộ chỉ số hỗn hợp: CSAT, Thời gian phản hồi đầu tiên (FRT) và Tỷ lệ giải quyết trong cuộc gọi đầu tiên (FCR). Tránh việc chỉ ép thời gian gọi ngắn khiến trải nghiệm khách hàng bị giảm sút.'
        }
      ]
    };
  }

  if (t.includes('chiến dịch') || t.includes('campaign') || t.includes('khảo sát')) {
    return {
      title: 'Thiết kế Chiến dịch Chạm đến Cảm xúc',
      subtitle: 'Tối ưu hóa tỷ lệ phản hồi khảo sát NPS/CSAT chủ động',
      sections: [
        {
          icon: Lightbulb,
          title: 'Thời điểm là tất cả (Timing is Everything)',
          content: 'Gửi khảo sát CSAT quá sớm khi khách hàng chưa kịp trải nghiệm hết sản phẩm, hoặc quá trễ khi cảm xúc đã nguội lạnh đều làm giảm tính chính xác. Thời điểm vàng là trong vòng 1-4 giờ sau khi vé đóng.'
        },
        {
          icon: Sparkles,
          title: 'Tối ưu cấu trúc câu hỏi khảo sát',
          content: 'Giữ cho câu hỏi ngắn gọn dưới 3 bước. Luôn bắt đầu bằng câu hỏi trắc nghiệm điểm số (1-5 sao hoặc 1-10 điểm NPS) trước khi yêu cầu khách hàng viết phản hồi văn bản tự do.'
        },
        {
          icon: AlertTriangle,
          title: 'Vòng lặp phản hồi khép kín (Close-the-Loop)',
          content: 'Khi một chiến dịch khảo sát phát hiện khách hàng chấm điểm thấp, hệ thống phải tự động tạo một Vé khẩn cấp để chuyên viên CS khép kín vòng lặp, xử lý nỗi đau của khách hàng ngay lập tức.'
        }
      ]
    };
  }

  if (t.includes('trí tuệ') || t.includes('ai') || t.includes('omi') || t.includes('gemini')) {
    return {
      title: 'Khai phóng Sức mạnh Trí tuệ Nhân tạo OmiAI & Gemini',
      subtitle: 'Tự động hóa thông minh nhưng vẫn giữ trọn vẹn kết nối con người',
      sections: [
        {
          icon: Lightbulb,
          title: 'Phản hồi tự động tinh tế',
          content: 'Huấn luyện Gemini 2.5 với bối cảnh thương hiệu rõ ràng để các câu trả lời tự động luôn mang tính xây dựng, lịch sự và cá nhân hóa. AI không nên trả lời rập khuôn như một robot lạnh lùng.'
        },
        {
          icon: Sparkles,
          title: 'Trợ lý đắc lực cho Agent (Agent Copilot)',
          content: 'Sử dụng AI để tóm tắt các cuộc hội thoại dài và phức tạp, gợi ý câu trả lời mẫu (Suggested Replies) dựa trên Kho tri thức. Giúp Agent mới hòa nhập và xử lý vé nhanh ngang ngửa chuyên viên lâu năm.'
        },
        {
          icon: AlertTriangle,
          title: 'Human-in-the-loop (Con người kiểm soát)',
          content: 'Đối với các vé có cảm xúc tiêu cực mạnh hoặc nội dung nhạy cảm, hãy cài đặt để AI chỉ soạn thảo bản nháp, nhường quyền kiểm duyệt và nhấn nút gửi cho Agent con người.'
        }
      ]
    };
  }

  if (t.includes('tự động') || t.includes('automation')) {
    return {
      title: 'Thiết lập Luồng Vận hành Tự động Siêu cấp',
      subtitle: 'Giải phóng đội ngũ khỏi các tác vụ thủ công lặp đi lặp lại',
      sections: [
        {
          icon: Lightbulb,
          title: 'Tự động hóa phân phối dựa trên quy tắc',
          content: 'Thiết lập Triggers để tự động gán vé cho Agent phù hợp dựa trên từ khóa, ngôn ngữ, hoặc kênh tiếp nhận. Giảm thiểu thời gian chờ phân bổ vé về mức 0 giây.'
        },
        {
          icon: Sparkles,
          title: 'Sử dụng Webhooks kết nối vạn vật',
          content: 'Tận dụng Webhooks để đồng bộ hóa tức thì trạng thái khách hàng lên hệ thống CRM bên ngoài hoặc gửi thông báo khẩn cấp qua Telegram/Slack cho đội kỹ thuật khi có lỗi hệ thống.'
        },
        {
          icon: AlertTriangle,
          title: 'Kiểm toán vòng lặp vô hạn',
          content: 'Khi cấu hình nhiều quy tắc tự động chồng chéo, hãy cẩn thận tránh tạo ra vòng lặp vô hạn (ví dụ: Quy tắc A đổi trạng thái tạo ra sự kiện kích hoạt Quy tắc B, Quy tắc B đổi trạng thái kích hoạt lại Quy tắc A).'
        }
      ]
    };
  }

  if (t.includes('hộp thư') || t.includes('inbox')) {
    return {
      title: 'Bí quyết Làm chủ Hộp thư Đa kênh (Omnichannel)',
      subtitle: 'Không bỏ sót bất kỳ tương tác nào tại một giao diện hợp nhất',
      sections: [
        {
          icon: Lightbulb,
          title: 'Hợp nhất đa kênh thời gian thực',
          content: 'Khách hàng mong muốn chuyển đổi mượt mà từ Facebook Chat qua Email rồi đến gọi điện thoại mà không phải lặp lại vấn đề của họ. Hộp thư đa kênh lưu giữ toàn bộ ngữ cảnh giúp bạn giải quyết điều này.'
        },
        {
          icon: Sparkles,
          title: 'Phối hợp chéo mượt mà (Collaboration)',
          content: 'Sử dụng tính năng Ghi chú nội bộ (Internal Notes) để trao đổi thông tin kín đáo với đồng nghiệp hoặc gắn thẻ chuyên gia kỹ thuật vào hỗ trợ trực tiếp ngay trên vé của khách.'
        },
        {
          icon: AlertTriangle,
          title: 'Quản lý Thời gian phản hồi đầu tiên (FRT)',
          content: 'Đặt ra cam kết FRT nghiêm ngặt cho kênh Chat trực tuyến dưới 2 phút và kênh Email dưới 2 giờ. Sự phản hồi nhanh chóng là liều thuốc xoa dịu tốt nhất đối với khách hàng đang lo lắng.'
        }
      ]
    };
  }

  if (t.includes('kho tri thức') || t.includes('help') || t.includes('trợ giúp') || t.includes('tri thức')) {
    return {
      title: 'Xây dựng Pháo đài Tự phục vụ (Self-Service Center)',
      subtitle: 'Giảm tải áp lực hệ thống bằng cách trao quyền chủ động cho khách hàng',
      sections: [
        {
          icon: Lightbulb,
          title: 'Nội dung dễ hiểu, trực quan',
          content: 'Viết bài viết hướng dẫn (FAQs) theo cấu trúc bước-by-bước rõ ràng, có hình ảnh minh họa sinh động hoặc video ngắn. Khách hàng luôn thích tự giải quyết vấn đề nhanh chóng hơn là phải xếp hàng chờ đợi Agent.'
        },
        {
          icon: Sparkles,
          title: 'Cải tiến dựa trên dữ liệu tìm kiếm',
          content: 'Thường xuyên rà soát các từ khóa mà khách hàng tìm kiếm nhưng không ra kết quả trong Kho tri thức để chủ động biên soạn thêm nội dung mới, bít kín các khoảng trống thông tin.'
        },
        {
          icon: AlertTriangle,
          title: 'Đồng bộ hóa với AI phản hồi',
          content: 'Kho tri thức chất lượng cao chính là nguồn dữ liệu quý giá nhất (Grounding data) để huấn luyện Gemini phản hồi chính xác. Hãy giữ cho tài liệu luôn cập nhật tương ứng với các phiên bản sản phẩm mới.'
        }
      ]
    };
  }

  if (t.includes('hồ sơ') || t.includes('tài khoản') || t.includes('cá nhân') || t.includes('profile')) {
    return {
      title: 'Quản trị Hiệu suất Cá nhân & Sẵn sàng Vận hành',
      subtitle: 'Cân bằng giữa công việc hỗ trợ và thời gian nghỉ ngơi khoa học',
      sections: [
        {
          icon: Lightbulb,
          title: 'Trạng thái hoạt động chính xác',
          content: 'Hãy cập nhật trạng thái của bạn (Sẵn sàng, Đang bận, Đi ăn trưa) một cách chuẩn xác. Hệ thống phân phối vé thông minh sẽ dựa vào đây để định tuyến vé, tránh làm phiền bạn ngoài giờ làm việc.'
        },
        {
          icon: Sparkles,
          title: 'Tự theo dõi và cải thiện năng suất',
          content: 'Theo dõi điểm CSAT cá nhân và thời gian phản hồi trung bình của bản thân để liên tục mài giũa kỹ năng thấu cảm khách hàng, hướng tới các vị trí CX Coach hoặc CX Manager tương lai.'
        },
        {
          icon: AlertTriangle,
          title: 'Tinh thần kiên định và thấu cảm',
          content: 'Làm việc trong ngành dịch vụ khách hàng đôi khi sẽ gặp những tình huống áp lực lớn. Hãy rèn luyện sự bình tĩnh, không cá nhân hóa những lời tức giận của khách hàng, vì họ đang tức giận với sự cố chứ không phải bạn.'
        }
      ]
    };
  }

  // Default guide content for any other page (Settings, Notifications, general)
  return {
    title: `Cẩm nang Vận hành & Cấu hình Hệ thống OmiAI`,
    subtitle: 'Thiết lập các tiêu chuẩn vàng cho trải nghiệm khách hàng tối ưu',
    sections: [
      {
        icon: Lightbulb,
        title: 'Thiết lập Hệ thống tối giản nhưng Hiệu quả',
        content: 'Mọi cấu hình trong hệ thống đều trực tiếp ảnh hưởng đến cảm xúc khách hàng. Từ giờ làm việc, quy trình phân quyền, cho đến các kênh thông báo đều cần được thiết kế nhất quán và bảo mật.'
      },
      {
        icon: Sparkles,
        title: 'Tự động hóa kết hợp Trí tuệ con người',
        content: 'Hãy cấu hình để các thông báo quan trọng (như vi phạm SLA hoặc khách hàng VIP) được gửi tức thì đến các quản lý cấp cao để can thiệp kịp thời, đảm bảo an toàn tuyệt đối cho trải nghiệm.'
      },
      {
        icon: AlertTriangle,
        title: 'Lời khuyên từ Chuyên gia CX',
        content: 'Liên tục rà soát các quy tắc hệ thống định kỳ mỗi tháng. Hành vi và mong đợi của khách hàng luôn thay đổi, hệ thống vận hành của bạn cũng cần linh hoạt thích ứng theo.'
      }
    ]
  };
};

export const PageBanner: React.FC<PageBannerProps> = ({
  icon: Icon,
  title,
  description,
  backButton,
  onBack
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const guide = getGuideContent(title);

  return (
    <>
      <div className="flex w-full flex-col md:flex-row items-start justify-between bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border border-slate-200/60 shadow-sm mb-6 gap-4">
        {/* Cột trái (70%) */}
        <div className="flex items-start gap-4 w-full md:w-[70%]">
          {backButton && onBack && (
            <button 
              onClick={onBack}
              className="mt-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer border border-slate-200 shadow-sm shrink-0"
              title="Quay về"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          )}
          <motion.div 
            className="bg-blue-100 text-blue-600 p-3 rounded-xl shadow-inner shrink-0"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-8 h-8 text-blue-600" strokeWidth={2} />
          </motion.div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              {title}
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              </motion.span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Cột phải */}
        <div className="flex justify-end w-full md:w-auto shrink-0">
          <motion.button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 border border-blue-500/10 cursor-pointer"
            whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            <BookOpen className="w-4 h-4" />
            Tài liệu hướng dẫn
          </motion.button>
        </div>
      </div>

      {/* MODAL HƯỚNG DẪN CX CHUYÊN SÂU */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content Container */}
            <motion.div 
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 p-6 text-white shrink-0">
                <div className="absolute right-4 top-4">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl border border-blue-500/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                    Góc nhìn Chuyên gia CX (Customer Experience)
                  </span>
                </div>
                <h3 className="text-xl font-black tracking-tight">{guide.title}</h3>
                <p className="text-xs text-slate-300 font-medium mt-1 italic">{guide.subtitle}</p>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
                {guide.sections.map((section, idx) => {
                  const SecIcon = section.icon;
                  return (
                    <motion.div 
                      key={idx}
                      className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className={cn(
                        "p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center",
                        idx === 0 ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        idx === 1 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        "bg-rose-50 text-rose-600 border border-rose-100"
                      )}>
                        <SecIcon className="w-5 h-5 shrink-0" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold text-slate-800 leading-none">
                          {section.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {section.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Giải pháp Win-Win • OmiAI Ecosystem
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Đã hiểu, đóng tài liệu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

