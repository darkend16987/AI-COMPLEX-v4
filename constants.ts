import type { AspectRatio } from './types';

export const predefinedReferenceImages = {
  building: [
    { name: 'Building Style 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588730600_40c3acebfcd07f7ea9029c82ca948a59.jpg' },
    { name: 'Building Style 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588735695_52147b30644d6a42bec87f807661f7ff.jpg' },
    { name: 'Building Style 3', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637645602_0a8bfc1046d9bfeeee62aac28d1afe87.jpg' },
    { name: 'Building Style 4', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637644035_6298697cb54748adc10d86a43ebdfa7b.jpg' },
    { name: 'Building Style 5', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637643871_90807b3e08c2575e83dab45b46f94e87.jpg' },
  ],
  house: [],
  villa: [
    { name: 'Villa Style 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637643969_cd6b5c0e95120c877168f822520f18b7.jpg' },
    { name: 'Villa Style 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637649555_89ab81eea211c0448237820852b9a246.jpg' },
  ],
  'quy hoạch': [],
};

export const stylePrompts = [
    "phong cách hiện đại",
    "phong cách tối giản",
    "phong cách neoclassic",
    "phong cách Indochine",
    "phong cách công nghiệp",
    "phong cách Scandinavian",
];

export const contextPrompts = [
    "ở đường phố việt nam",
    "ở vùng làng quê việt nam",
    "ở khu đô thị sang trọng, hiện đại vinhomes hà nội",
    "ở ngã ba đường phố việt nam",
    "ở sân vườn nhiệt đới tại miền quê việt nam",
    "nằm bên đường nhựa với 2 bên cạnh nhà là cây xanh",
    "nằm trong Vườn châu Âu rộng, lối đi lát đá, tượng thần và cây cắt tỉa hình khối",
    "nằm dưới chân núi hùng vĩ, bao quanh là khu vườn xanh mướt và cây lá mùa thu nhiều màu sắc. Phía trước có hồ bơi và thảm cỏ phẳng mượt",
];

export const lightingPrompts = [
      "Ánh sáng ban ngày tự nhiên, trời trong xanh",
      "Ánh sáng hoàng hôn ấm áp, đổ bóng dài",
      "Ánh sáng ban đêm, ánh trăng chiếu sáng toàn cảnh, nhấn mạnh đèn nội thất và ngoại thất",
      "Trời u ám, ánh sáng dịu, không có bóng gắt",
      "bình minh với ánh sáng trong trẻo và không khí yên bình.",
      "buổi hoàng hôn tím với ánh sáng đèn nội thất hắt ra lung linh",
      "sương mù dày đặc vào sáng sớm tạo cảm giác huyền ảo.",
      "trời vừa mưa xong đường hơi ướt, bầu trời mây nhẹ",
];

export const cameraAnglePrompts = [
    { display: "Chụp từ trên cao xuống", value: "Chụp từ trên cao xuống (high-angle shot)"},
    { display: "Góc thấp (cảm giác hùng vĩ)", value: "Góc thấp từ dưới nhìn lên, tạo cảm giác công trình cao lớn, hùng vĩ (low-angle shot)"},
    { display: "Góc nhìn 3/4 từ bên trái", value: "Góc nhìn 3/4 từ bên trái, thể hiện chiều sâu , giữ nguyên bối cảnh đường phố Việt Nam, nhà hàng xóm và bầu trời xanh."},
    { display: "Chụp toàn cảnh từ xa", value: "Chụp toàn cảnh từ xa (wide long shot), thấy toàn cảnh xung quanh"},
    { display: "Chụp cận cảnh chi tiết", value: "Chụp cận cảnh chi tiết (detailed close-up shot)"},
    { display: "Góc nhìn 3/4 từ bên phải", value: "Góc nhìn 3/4 từ bên phải, thể hiện chiều sâu , giữ nguyên bối cảnh đường phố Việt Nam, nhà hàng xóm và bầu trời xanh."},
    { display: "Góc chụp chính diện, đối xứng", value: "góc chụp chính diện mặt tiền công trình, góc nhìn thẳng, đối xứng"},
];

export const planStylePrompts = [
    "phong cách hiện đại, tông màu trắng và gỗ",
    "phong cách tối giản (minimalist), nội thất thông minh",
    "phong cách scandinavian, ánh sáng tự nhiên",
    "phong cách sang trọng (luxury), vật liệu cao cấp như đá marble, kim loại mạ vàng",
    "phong cách Indochine, kết hợp truyền thống và hiện đại",
];

export const planRoomTypePrompts = [
    "phòng ngủ",
    "phòng khách",
    "phòng bếp",
    "phòng ăn",
    "phòng tắm",
];

export const planColorizePrompts = [
    "Tô màu mặt bằng theo phong cách bán hiện thực (Semi-realistic)",
    "Tô màu mặt bằng với nền đen và nét trắng, kiểu bản vẽ kỹ thuật",
    "Tô màu mặt bằng theo phong cách chất liệu cơ bản (Material Base), thể hiện rõ vật liệu gỗ, gạch, bê tông",
    "Tô màu mặt bằng theo phong cách marker (Marker Style), giống như vẽ tay bằng bút marker",
    "Tô màu mặt bằng theo phong cách màu nước (Watercolor Style)",
    "Tô màu mặt bằng theo phong cách hiện thực (Photorealistic), với đổ bóng và vật liệu chân thực",
];
  
export const videoPrompts = [
    { display: "Time-lapse Ngày & Đêm", value: "Tạo video time-lapse của tòa nhà từ sáng đến tối, thể hiện sự thay đổi của ánh sáng tự nhiên và ánh sáng nhân tạo." },
    { display: "Drone bay vòng quanh", value: "Một cảnh quay flycam bay về phía tòa nhà và bay vòng quanh một lần." },
    { display: "Mây trôi", value: "Một video time-lapse mây trôi qua tòa nhà vào một ngày nắng đẹp." },
    { display: "Cảnh mưa nhẹ", value: "Hiển thị tòa nhà trong một cơn mưa rào nhẹ, với những phản chiếu trên bề mặt ẩm ướt." },
    { display: "Zoom vào lối vào", value: "Một cảnh quay zoom chậm vào lối vào chính của tòa nhà." },
    { display: "Lướt ngang mặt tiền", value: "Lướt camera ngang qua mặt tiền của tòa nhà từ trái sang phải." },
];

export const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['auto', '1:1', '4:3', '3:4', '16:9', '9:16'];

export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
    auto: 'Tự động',
    '1:1': 'Vuông (1:1)',
    '4:3': 'Ngang (4:3)',
    '3:4': 'Dọc (3:4)',
    '16:9': 'Rộng (16:9)',
    '9:16': 'Story (9:16)',
};