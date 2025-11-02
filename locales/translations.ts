export const translations = {
    vi: {
        // App-wide
        appTitle: "AIcomplex",
        developedBy: "Phát triển bởi AIAI Studio",
        sponsoredBy: "Đồng hành bảo trợ phát triển VietCG",
        changeLanguage: "Thay đổi ngôn ngữ",
        
        // Welcome Screen
        welcomeHeader: "AIcomplex",
        welcomeDescription: "Ứng dụng AI trong thiết kế kiến trúc và nội thất. Biến ý tưởng của bạn thành hiện thực với sức mạnh của trí tuệ nhân tạo.",
        welcomeStartButton: "Bắt đầu",

        // Top Nav Bar
        tabCreate: "Tạo Ảnh",
        tabCameraAngle: "Góc camera",
        tabEdit: "Edit Ảnh",
        tabPlanTo3D: "Plan to 3D",
        tabCanvaMix: "Canva Mix",
        tabCreatePrompt: "Magic Prompt",
        tabCreateVideo: "Tạo Video",
        tabUtilities: "Tiện ích",

        // Control Panel
        uploadImage: "Tải ảnh lên",
        uploadImageOptional: "Tải ảnh lên (Tùy chọn)",
        handDrawnHint: "Ưu tiên ảnh vẽ tay, ảnh sketchup không bóng đổ và bao cảnh",
        referenceImage: "Ảnh tham chiếu (Style)",
        prompt: "Promt",
        negativePrompt: "Promt loại trừ (Negative Prompt)",
        negativePromptHelp: "Liệt kê những thứ bạn không muốn xuất hiện trong ảnh. Ví dụ: xấu xí, biến dạng, chất lượng thấp, mờ, chữ ký...",
        aspectRatio: "Tỷ lệ khung hình",
        imageCount: "Số lượng ảnh",
        dropzoneHint: "Kéo thả, dán, hoặc click",
        dropzoneFormats: "PNG, JPG, WEBP",
        delete: "Xóa",
        choosePresetImage: "Chọn ảnh có sẵn",
        close: "Đóng",
        referenceImageHelp: "AI sẽ lấy cảm hứng về phong cách, ánh sáng, bối cảnh và vật liệu.",
        processingImage: "Đang xử lý ảnh...",
        addFromPresets: "Hoặc chọn promt có sẵn để thêm vào:",
        style: "Phong cách",
        context: "Bối cảnh",
        lighting: "Ánh sáng",
        aspectRatioHelp: "Chỉ có hiệu lực khi không tải lên 'Ảnh gốc'.",
        generateFromImage: "Tạo từ ảnh",
        generateFromPromptText: "Tạo từ Promt",
        generating: "Đang tạo...",
        specifyCloseUpAngle: "Chỉ định góc cận cảnh (Tùy chọn)",
        specifyCloseUpHelp: "Vẽ một hình chữ nhật trên ảnh để AI tự động render cận cảnh khu vực đó.",
        selectArea: "Chọn vùng",
        cancel: "Hủy",
        clearSelection: "Xóa vùng chọn",
        chooseCameraAngle: "Chọn góc camera",
        selectCameraAnglePlaceholder: "-- Chọn góc camera --",
        customDescription: "Mô tả tùy chỉnh",
        customDescriptionPlaceholder: "Ví dụ: chụp từ góc 3/4 từ dưới lên...",
        chooseFunction: "Chọn chức năng",
        editSelectedArea: "Sửa vùng chọn",
        mergeHouse: "Ghép nhà",
        mergeMaterial: "Thay vật liệu",
        mergeFurniture: "Thay nội thất",
        editFunctionHelp: {
            inpaint: "Xóa hoặc thay thế đối tượng trong ảnh bằng cách vẽ vùng chọn và nhập mô tả.",
            mergeHouse: "Ghép một công trình mới vào bối cảnh có sẵn.",
            mergeMaterial: "Áp dụng vật liệu từ ảnh thứ hai lên đối tượng trong ảnh gốc.",
            mergeFurniture: "Thay thế đồ nội thất trong ảnh gốc bằng đồ từ ảnh thứ hai."
        },
        uploadSourceImage: "Tải ảnh gốc",
        uploadContextImage: "Tải ảnh bối cảnh (Ảnh 1)",
        contextImageHelp: "Ảnh bối cảnh đã bôi đỏ phần khu đất cần ghép nhà",
        resetImage: "Xóa Ảnh & Bắt đầu lại",
        chooseToolAndDraw: "Chọn công cụ & Vẽ vùng chọn",
        lassoTool: "Lasso",
        brushTool: "Tô (Brush)",
        lineThickness: "Độ dày đường viền",
        brushSize: "Kích thước cọ",
        uploadReferenceOptional: "Tải ảnh tham chiếu (Tùy chọn)",
        referenceImageHelpEdit: "AI sẽ lấy cảm hứng từ ảnh này để thay đổi vùng đã chọn.",
        uploadBuildingImage: "Tải ảnh công trình (Ảnh 2)",
        uploadMaterialFurnitureImage: "Tải ảnh vật liệu/nội thất (Ảnh 2)",
        image2Help: "Lưu ý nên tách nền và tỉ lệ ảnh 2 gần bằng tỉ lệ ảnh 1. Ví dụ cùng tỉ lệ 3:4.",
        promptPlaceholder: {
            create: "Ví dụ: một ngôi nhà hiện đại, ánh sáng ban ngày, ảnh thực tế...",
            negative: "ví dụ: chữ, chữ ký, chất lượng thấp, nhiễu",
            inpaint: "Ví dụ: thêm một cửa sổ kiểu vòm...",
            mergeHouse: "Mô tả cách ghép hai ảnh...",
            mergeMaterial: "Ví dụ: Thay thảm ở ảnh 1 bằng thảm họa tiết trong ảnh 2",
            mergeFurniture: "Mô tả cách ghép hai ảnh...",
            planTo3dRender: "Phòng khách hiện đại...",
            planTo3dColorize: "Tông màu pastel...",
            video: "Mô tả chuyển động...",
            videoPrompt: "Ví dụ: một cảnh flycam bay chậm từ xa lại gần công trình..."
        },
        promptExamples: "Hoặc chọn promt mẫu:",
        selectOption: "-- Chọn một tùy chọn --",
        upload2dPlan: "Tải bản vẽ 2D",
        chooseGoal: "Chọn mục tiêu",
        create3DImage: "Tạo ảnh 3D",
        colorizePlan: "Đổ màu mặt bằng",
        suggestions: "Gợi ý",
        chooseModel: "Chọn Model",
        veo2NoKey: "Veo 2 (Không cần key riêng)",
        veo31Fast: "Veo 3.1 (Nhanh)",
        veo31HighQuality: "Veo 3.1 (Chất lượng cao)",
        motionDescription: "Mô tả chuyển động",
        selectSuggestion: "-- Chọn một gợi ý --",
        uploadSpaceImage: "Tải ảnh không gian (nền)",
        changeBgImage: "Thay đổi ảnh nền",
        clickOrDropNew: "Click hoặc kéo thả ảnh mới",
        deleteAll: "Xóa tất cả",
        uploadDecorImage: "Tải ảnh đồ decor (tách nền)",
        decorHelp: "Nên dùng ảnh đã tách nền (PNG)",
        clickToAdd: "Click để thêm vào canvas",
        adjustments: "Tinh chỉnh",
        lockLayout: "Khóa Layout",
        deleteObject: "Xóa đối tượng (hoặc dùng phím Backspace)",
        rotate: "Xoay",
        flipHorizontal: "Lật ngang",
        flipVertical: "Lật dọc",
        uploadToAnalyze: "Tải ảnh lên để phân tích",
        analyzeHelp: "AI sẽ phân tích ảnh và tạo ra 20 promt nhiếp ảnh chuyên nghiệp.",
        uploadStartImage: "Tải ảnh bắt đầu",
        virtualTourHelp: "Tải lên một ảnh render 3D để bắt đầu chuyến tham quan ảo.",
        createImage: "Tạo Ảnh",
        createVideo: "Tạo Video",
        createPrompt: "Tạo Promt",

        // Gallery
        loadingStart: "Bắt đầu quá trình tạo...",
        loadingAnalyzePrompts: "Đang phân tích ảnh và tạo prompts...",
        loadingMessageDefault: "Đang tạo ảnh, xin đợi một chút...",
        loadingUsageLimit: "Giới hạn sử dụng AIcomplex:",
        loadingUsageText: "Mỗi người dùng có thể tạo từ 40 – 45 hình ảnh mỗi ngày. Để tăng số lượt tạo ảnh, bạn có thể sử dụng 2–3 địa chỉ Gmail khác nhau.",
        loadingUsageNote: "👉 Lưu ý: Mỗi email nên đăng nhập ở một trình duyệt hoặc tab Chrome riêng biệt để tránh xung đột tài khoản.",
        loadingVideoHeader: "AI đang tạo video của bạn...",
        loadingVideoHelp: "Quá trình tạo video có thể mất vài phút. Vui lòng không đóng hoặc tải lại trang.",
        loadingPromptHeader: "Đang tạo promts...",
        loadingPromptHelp: "AI đang phân tích hình ảnh của bạn để tạo ra các mô tả nhiếp ảnh độc đáo.",
        emptyStateHeader: "Kết Quả Render",
        emptyStateText: "Kết quả sẽ xuất hiện ở đây.",
        emptyCanvaHeader: "Không gian sáng tạo của bạn",
        emptyCanvaText: "Tải lên 'ảnh không gian' ở bảng điều khiển để bắt đầu.",
        emptyPromptHeader: "Gợi ý Promt chuyên nghiệp",
        emptyPromptText: "Tải lên một ảnh ở bảng điều khiển và AI sẽ tạo ra 20 promt theo phong cách nhiếp ảnh gia.",
        emptyTourHeader: "Tham quan ảo",
        emptyTourText: "Tải lên một ảnh render ở bảng điều khiển để bắt đầu chuyến tham quan của bạn.",
        tourHistory: "Lịch sử chuyến tham quan",
        fullscreen: "Xem toàn màn hình",
        editThisImage: "Chỉnh sửa ảnh này",
        useAsSource: "Sử dụng làm ảnh nguồn",
        downloadImage: "Tải ảnh",
        downloadVideo: "Tải video",
        copyPrompt: "Copy promt",
        noPrompt: "Chưa có promt",
        createFromThisPrompt: "Tạo ảnh từ promt này",
        tourUndo: "Hoàn tác",
        tourRedo: "Làm lại",
        
        // History
        history: "Lịch sử",
        clearAll: "Xóa tất cả",
        clearHistoryConfirm: "Bạn có chắc muốn xóa toàn bộ lịch sử không?",
        review: "Xem lại",
        images: "ảnh",
        prompts: "Prompts",
        historyEmpty: "Kết quả từ các lần tạo ảnh trước sẽ được lưu ở đây.",

        // Fullscreen Viewer
        closeFullscreen: "Đóng",
        editImage: "Chỉnh sửa ảnh",
        reset: "Reset",
        saveImage: "Lưu ảnh",

        // Veo API Key Screen
        apiKeyRequired: "Yêu cầu API Key",
        apiKeyDescription: "Để sử dụng tính năng tạo video, bạn cần chọn một API Key từ dự án Google Cloud của bạn. Tính năng này sử dụng model Veo và có thể phát sinh chi phí.",
        apiKeyBillingInfo: "Để biết thêm thông tin về giá, vui lòng tham khảo",
        billingDocs: "tài liệu thanh toán",
        selectApiKey: "Chọn API Key",
        
        // Alerts
        alertUploadSource: "Vui lòng tải lên ảnh nguồn.",
        alertDrawMask: "Vui lòng vẽ một vùng chọn trên ảnh để chỉnh sửa.",
        alertUploadBothImages: "Vui lòng tải lên cả hai ảnh để thực hiện.",
        alertUploadBg: "Vui lòng tải lên ảnh không gian (nền).",
        alertUploadDecor: "Vui lòng tải lên ít nhất một ảnh đồ decor.",
        alertEnterPrompt: "Vui lòng nhập mô tả (promt).",
        alertGenerationFailed: "Đã xảy ra lỗi khi tạo. Vui lòng kiểm tra API key và thử lại.",
        alertInvalidApiKey: "API Key không hợp lệ hoặc đã bị xóa. Vui lòng chọn một API Key khác.",
        alertNoSourceForPrompt: "Không tìm thấy ảnh nguồn từ tab Tạo Promt. Vui lòng thử lại.",
        alertImageGenFailedRetry: "Đã xảy ra lỗi khi tạo ảnh. Vui lòng thử lại.",
        alertTourFailed: "Đã xảy ra lỗi khi tạo khung hình tiếp theo.",
        alertApiKeyUtilUnavailable: "API Key selection utility is not available.",
        alertImageGenFailed: "AI did not return any images.",
        alertMoodboard: "Vui lòng tải lên ảnh nguồn cảm hứng và nhập mô tả chủ đề.",
        alertLighting: "Vui lòng tải ảnh lên và chọn ít nhất một loại ánh sáng.",
        alertVideoPrompt: "Vui lòng tải lên ảnh nguồn và nhập yêu cầu chuyển động.",

        // Social Links
        donate: "Donate",

        // Default prompt text
        promptInitial: "Ảnh chụp thực tế ngôi nhà",
        promptPlanTo3d: "Tạo ảnh render 3D nội thất từ bản vẽ 2D này, góc nhìn eye-level, chân thực",
        promptCloseUp: "Chụp cận cảnh theo vùng đã chọn.",
        promptCanvaMix: "Canva Mix generation",
        promptArchitecturalGenerated: "Đã tạo Prompts kiến trúc",
        defaultNegativePrompt: "cartoon, 2d illustration, sketch, cgi, render artifact, fake render, unreal engine style, game asset, lowpoly, plastic surface, wax texture, flat lighting, incorrect reflections, overexposed, underexposed, low contrast, washed out, noisy, blurry, depth map error, distorted perspective, unrealistic scale, fake shadows, wrong proportion, low resolution, low detail, low quality, over-saturated, oversharpened edges, halo, outline, glowing edges, bad composition, incorrect DOF, cutout, text, watermark, logo, posterized, painting, drawing, toy-like, artificial lighting, non-realistic material, duplicated objects, blurry wall texture, flat materials, poor texture mapping, distorted lines, model border",

        // Utilities
        utilitiesTitle: "Tiện ích Mở rộng",
        moodboardTitle: "Tạo Moodboard",
        moodboardDesc: "Tải lên một hình ảnh và nhập mô tả để AI tạo ra một bảng cảm hứng (moodboard) hoàn chỉnh với bảng màu, vật liệu và hình ảnh liên quan.",
        videoPromptTitle: "Kịch bản Video",
        videoPromptDesc: "Tạo kịch bản chuyển động chi tiết cho video kiến trúc.",
        lightingTitle: "Thiết lập Ánh sáng",
        lightingDesc: "Thử nghiệm các kịch bản chiếu sáng khác nhau cho mô hình của bạn.",
        virtualTourTitle: "Tham quan ảo",
        virtualTourDesc: "Tải lên một ảnh render 3D và di chuyển trong không gian bằng AI.",
        comingSoon: "Sắp ra mắt",
        backToUtilities: "Quay lại Tiện ích",
        uploadInspirationImage: "1. Tải ảnh nguồn cảm hứng",
        uploadReferenceImage: "2. Tải ảnh tham chiếu (Style)",
        moodboardPromptHelp: "3. Mô tả chủ đề hoặc phong cách",
        moodboardReferenceHelp: "AI sẽ lấy cảm hứng về màu sắc và phong cách từ ảnh này.",
        moodboardImageCount: "4. Số lượng kết quả",
        generateMoodboardButton: "Tạo Moodboard",
        moodboardEmptyHeader: "Bảng cảm hứng của bạn",
        moodboardEmptyText: "Tải ảnh và nhập mô tả để bắt đầu.",
        generatingMoodboard: "Đang tạo moodboard...",
        moodboardSamplePrompt: "Sử dụng promt mẫu",
        moodboardSamplePromptText: "tạo ảnh moodboard đò rời nội thất, tách riêng từng đồ rời với nền trắng, sẽ có 1 ảnh tổng thể ở trung tâm, bên dưới sẽ là các đồ rời tách riêng (gường, tab đầu giường, tủ quần áo, đèn, thảm, rèm), bên phải là bảng màu và vật liệu, tất cả nằm gọn trong 1 khung dọc còn lại là nền trắng",
        // Lighting Setup Utility
        uploadModelImage: "1. Tải ảnh mô hình",
        chooseLighting: "2. Chọn loại ánh sáng",
        interiorLighting: "Ánh sáng Nội thất",
        exteriorLighting: "Ánh sáng Ngoại thất",
        generateLightingButton: "Tạo ảnh với ánh sáng mới",
        lightingEmptyHeader: "Không gian ánh sáng của bạn",
        lightingEmptyText: "Tải ảnh lên để bắt đầu thử nghiệm các kịch bản chiếu sáng.",
        generatingLighting: "Đang tạo ảnh mới...",
        // Video Prompt Utility
        motionRequest: "2. Yêu cầu chuyển động (tiếng Việt)",
        generatingVideoPrompt: "Đang tạo prompt video...",
        generatedVideoPromptTitle: "Prompt đã tạo (tiếng Anh)",
        videoPromptEmptyHeader: "Kịch bản Video của bạn",
        videoPromptEmptyText: "Tải ảnh lên và nhập yêu cầu để AI tạo ra một prompt video chuyên nghiệp.",

        constants: {
            interiorLightingOptions: [
                { display: "-- Chọn ánh sáng nội thất --", value: "" },
                { display: "Tự nhiên ban ngày qua cửa sổ", value: "ánh sáng tự nhiên ban ngày dịu nhẹ chiếu qua cửa sổ lớn" },
                { display: "Đèn trần ấm áp (vàng)", value: "ánh sáng vàng ấm áp từ hệ thống đèn trần downlight và đèn hắt" },
                { display: "Ánh sáng studio (trắng)", value: "ánh sáng trắng, đều và mềm mại như trong studio, không có bóng gắt" },
                { display: "Hoàng hôn chiếu vào phòng", value: "ánh sáng hoàng hôn màu cam ấm áp chiếu xiên vào phòng, tạo bóng đổ dài" },
                { display: "Ban đêm (đèn và trăng)", value: "ánh sáng ban đêm kết hợp giữa đèn nội thất và ánh trăng xanh dịu hắt từ bên ngoài" },
                { display: "Nghệ thuật: Cinematic huyền ảo", value: "ánh sáng cinematic với các luồng tia sáng (god rays) xuyên qua màn sương mỏng, tạo không khí huyền ảo và chiều sâu" },
                { display: "Nghệ thuật: Neon tương phản", value: "ánh sáng neon màu hồng và xanh lam tương phản mạnh, tạo phong cách cyberpunk hoặc retro-futuristic" },
                { display: "Nghệ thuật: Lò sưởi ấm cúng", value: "ánh sáng ấm áp, lung linh từ một lò sưởi đang cháy, tạo bóng đổ mềm mại và không khí ấm cúng, thân mật" },
                { display: "Nghệ thuật: Low-key kịch tính", value: "ánh sáng low-key với nguồn sáng chính duy nhất, tạo độ tương phản cao giữa sáng và tối, làm nổi bật hình khối và tạo cảm giác kịch tính" },
                { display: "Nghệ thuật: Bắc Âu 'Hygge'", value: "ánh sáng dịu nhẹ, phân tán từ nhiều nguồn đèn nhỏ và nến, tạo cảm giác 'hygge' thư giãn và ấm cúng kiểu Bắc Âu" }
            ],
            exteriorLightingOptions: [
                { display: "-- Chọn ánh sáng ngoại thất --", value: "" },
                { display: "Giữa trưa nắng gắt", value: "ánh sáng ban ngày gay gắt vào giữa trưa, trời trong xanh, tạo bóng đổ sắc nét" },
                { display: "Hoàng hôn vàng rực", value: "ánh sáng hoàng hôn vàng rực, bầu trời có mây màu cam và tím" },
                { display: "Bình minh trong trẻo", value: "ánh sáng bình minh trong trẻo, có sương nhẹ, không khí yên bình" },
                { display: "Trời u ám, sắp mưa", value: "bầu trời u ám, mây xám, ánh sáng khuếch tán mềm mại, không có bóng gắt" },
                { display: "Ban đêm, đèn đô thị", value: "bối cảnh ban đêm ở thành phố, công trình được chiếu sáng bởi đèn đường và đèn từ các tòa nhà xung quanh" },
                { display: "Nghệ thuật: Bão tố kịch tính", value: "bầu trời giông bão kịch tính với những tia sét lóe lên ở phía xa, chiếu sáng công trình một cách chớp nhoáng và mạnh mẽ" },
                { display: "Nghệ thuật: Rừng sương mù", value: "công trình chìm trong một khu rừng sương mù huyền ảo, ánh sáng mặt trời khuếch tán qua tán lá và màn sương" },
                { display: "Nghệ thuật: Mưa đêm Cyberpunk", value: "đêm mưa trong thành phố cyberpunk, ánh sáng neon từ các biển hiệu phản chiếu trên vũng nước và bề mặt ướt của công trình" },
                { display: "Nghệ thuật: Ảo ảnh sa mạc", value: "ánh sáng sa mạc gay gắt tạo hiệu ứng ảo ảnh nhiệt (mirage), làm biến dạng nhẹ không khí xung quanh chân công trình" },
                { display: "Nghệ thuật: Cực quang huyền ảo", value: "bầu trời đêm được chiếu sáng bởi cực quang (northern lights) với các dải màu xanh lá cây và tím huyền ảo" }
            ],
            predefinedReferenceImages: {
                building: [
                    { name: 'Phong cách Tòa nhà 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588730600_40c3acebfcd07f7ea9029c82ca948a59.jpg' },
                    { name: 'Phong cách Tòa nhà 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588735695_52147b30644d6a42bec87f807661f7ff.jpg' },
                    { name: 'Phong cách Tòa nhà 3', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637645602_0a8bfc1046d9bfeeee62aac28d1afe87.jpg' },
                    { name: 'Phong cách Tòa nhà 4', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637644035_6298697cb54748adc10d86a43ebdfa7b.jpg' },
                    { name: 'Phong cách Tòa nhà 5', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637643871_90807b3e08c2575e83dab45b46f94e87.jpg' },
                ],
                house: [],
                villa: [
                    { name: 'Phong cách Biệt thự 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637643969_cd6b5c0e95120c877168f822520f18b7.jpg' },
                    { name: 'Phong cách Biệt thự 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637649555_89ab81eea211c0448237820852b9a246.jpg' },
                ],
                'quy hoạch': [],
            },
            ASPECT_RATIO_LABELS: { auto: 'Tự động', '1:1': 'Vuông (1:1)', '4:3': 'Ngang (4:3)', '3:4': 'Dọc (3:4)', '16:9': 'Rộng (16:9)', '9:16': 'Story (9:16)' },
            stylePrompts: ["phong cách hiện đại", "phong cách tối giản", "phong cách neoclassic", "phong cách Indochine", "phong cách công nghiệp", "phong cách Scandinavian"],
            contextPrompts: ["ở đường phố việt nam", "ở vùng làng quê việt nam", "ở khu đô thị sang trọng, hiện đại vinhomes hà nội", "ở ngã ba đường phố việt nam", "ở sân vườn nhiệt đới tại miền quê việt nam", "nằm bên đường nhựa với 2 bên cạnh nhà là cây xanh", "nằm trong Vườn châu Âu rộng, lối đi lát đá, tượng thần và cây cắt tỉa hình khối", "nằm dưới chân núi hùng vĩ, bao quanh là khu vườn xanh mướt và cây lá mùa thu nhiều màu sắc. Phía trước có hồ bơi và thảm cỏ phẳng mượt"],
            lightingPrompts: ["Ánh sáng ban ngày tự nhiên, trời trong xanh", "Ánh sáng hoàng hôn ấm áp, đổ bóng dài", "Ánh sáng ban đêm, ánh trăng chiếu sáng toàn cảnh, nhấn mạnh đèn nội thất và ngoại thất", "Trời u ám, ánh sáng dịu, không có bóng gắt", "bình minh với ánh sáng trong trẻo và không khí yên bình.", "buổi hoàng hôn tím với ánh sáng đèn nội thất hắt ra lung linh", "sương mù dày đặc vào sáng sớm tạo cảm giác huyền ảo.", "trời vừa mưa xong đường hơi ướt, bầu trời mây nhẹ"],
            cameraAnglePrompts: [{ display: "Chụp từ trên cao xuống", value: "Chụp từ trên cao xuống (high-angle shot)"}, { display: "Góc thấp (cảm giác hùng vĩ)", value: "Góc thấp từ dưới nhìn lên, tạo cảm giác công trình cao lớn, hùng vĩ (low-angle shot)"}, { display: "Góc nhìn 3/4 từ bên trái", value: "Góc nhìn 3/4 từ bên trái, thể hiện chiều sâu , giữ nguyên bối cảnh đường phố Việt Nam, nhà hàng xóm và bầu trời xanh."}, { display: "Chụp toàn cảnh từ xa", value: "Chụp toàn cảnh từ xa (wide long shot), thấy toàn cảnh xung quanh"}, { display: "Chụp cận cảnh chi tiết", value: "Chụp cận cảnh chi tiết (detailed close-up shot)"}, { display: "Góc nhìn 3/4 từ bên phải", value: "Góc nhìn 3/4 từ bên phải, thể hiện chiều sâu , giữ nguyên bối cảnh đường phố Việt Nam, nhà hàng xóm và bầu trời xanh."}, { display: "Góc chụp chính diện, đối xứng", value: "góc chụp chính diện mặt tiền công trình, góc nhìn thẳng, đối xứng"}],
            planStylePrompts: ["phong cách hiện đại, tông màu trắng và gỗ", "phong cách tối giản (minimalist), nội thất thông minh", "phong cách scandinavian, ánh sáng tự nhiên", "phong cách sang trọng (luxury), vật liệu cao cấp như đá marble, kim loại mạ vàng", "phong cách Indochine, kết hợp truyền thống và hiện đại"],
            planRoomTypePrompts: ["phòng ngủ", "phòng khách", "phòng bếp", "phòng ăn", "phòng tắm"],
            planColorizePrompts: ["Tô màu mặt bằng theo phong cách bán hiện thực (Semi-realistic)", "Tô màu mặt bằng với nền đen và nét trắng, kiểu bản vẽ kỹ thuật", "Tô màu mặt bằng theo phong cách chất liệu cơ bản (Material Base), thể hiện rõ vật liệu gỗ, gạch, bê tông", "Tô màu mặt bằng theo phong cách marker (Marker Style), giống như vẽ tay bằng bút marker", "Tô màu mặt bằng theo phong cách màu nước (Watercolor Style)", "Tô màu mặt bằng theo phong cách hiện thực (Photorealistic), với đổ bóng và vật liệu chân thực"],
            videoPrompts: [{ display: "Time-lapse Ngày & Đêm", value: "Tạo video time-lapse của tòa nhà từ sáng đến tối, thể hiện sự thay đổi của ánh sáng tự nhiên và ánh sáng nhân tạo." }, { display: "Drone bay vòng quanh", value: "Một cảnh quay flycam bay về phía tòa nhà và bay vòng quanh một lần." }, { display: "Mây trôi", value: "Một video time-lapse mây trôi qua tòa nhà vào một ngày nắng đẹp." }, { display: "Cảnh mưa nhẹ", value: "Hiển thị tòa nhà trong một cơn mưa rào nhẹ, với những phản chiếu trên bề mặt ẩm ướt." }, { display: "Zoom vào lối vào", value: "Một cảnh quay zoom chậm vào lối vào chính của tòa nhà." }, { display: "Lướt ngang mặt tiền", value: "Lướt camera ngang qua mặt tiền của tòa nhà từ trái sang phải." }],
            materialChangeOptions: [{ display: "Thay vật liệu sàn", value: "Thay vật liệu sàn ở ảnh 1 bằng vật liệu mới trong ảnh 2, chia thành từng viên gạch theo tỉ lệ 800x800" }, { display: "Thay vật liệu thảm", value: "Thay vật liệu thảm ở ảnh 1 bằng thảm họa tiết mới trong ảnh 2" }, { display: "Thay rèm cửa", value: "Thay rèm cửa ở ảnh 1 bằng rèm cửa mới trong ảnh 2" }],
            furnitureChangeOptions: [{ display: "Thay sofa", value: "xóa bộ sofa trong ảnh 1, sau khi xóa xong thêm bộ sofa mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt bộ sofa ảnh 2 không được thay đổi thêm bớt" }, { display: "Thay đèn trùm", value: "xóa đèn trùm trong ảnh 1, sau khi xóa xong thêm đèn trùm mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt đèn trùm ảnh 2 không được thay đổi thêm bớt" }, { display: "Thay bàn trà", value: "xóa bàn trà trong ảnh 1, sau khi xóa xong thêm bàn trà mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt bàn trà ảnh 2 không được thay đổi thêm bớt" }, { display: "Thay kệ tivi", value: "xóa kệ tivi trong ảnh 1, sau khi xóa xong thêm kệ tivi mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt kệ tivi ảnh 2 không được thay đổi thêm bớt" }, { display: "Thay bàn ăn", value: "xóa bàn ăn trong ảnh 1, sau khi xóa xong thêm bàn ăn mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt bàn ăn ảnh 2 không được thay đổi thêm bớt" }, { display: "Thay tủ bếp", value: "xóa tủ bếp trong ảnh 1, sau khi xóa xong thêm tủ bếp mới trong ảnh 2 vào vị trí đó, giữ đúng chi tiêt tủ bếp ảnh 2 không được thay đổi thêm bớt" }],
        },
        engineeredPrompts: {
            applyLighting: `Bạn là một chuyên gia về ánh sáng và render kiến trúc. Người dùng đã cung cấp một hình ảnh và muốn thay đổi hoàn toàn kịch bản chiếu sáng của nó. Nhiệm vụ của bạn là render lại hình ảnh này với điều kiện ánh sáng mới được mô tả sau đây. **QUAN TRỌNG**: Bạn phải giữ nguyên 100% hình khối kiến trúc, vật liệu, và bố cục của hình ảnh gốc. Chỉ thay đổi ánh sáng, bóng đổ, và không khí tổng thể của cảnh. Kịch bản ánh sáng mong muốn là: "{0}".`,
            classifyImageTypePrompt: `Đây là hình ảnh nội thất hay ngoại thất? Chỉ trả lời bằng một từ duy nhất: 'interior' hoặc 'exterior'.`,
            generateFromImageInterior: `Hãy đóng vai một chuyên gia thiết kế nội thất và dựng hình 3D. Từ ảnh nội thất được cung cấp, hãy viết một promt chi tiết dưới 100 từ tập trung vào các yếu tố sau:
- Phong cách thiết kế của không gian.
- Mô tả chi tiết, nhấn mạnh vào sự chân thực của vật liệu (ví dụ: vân gỗ sồi tự nhiên, bề mặt đá marble bóng mờ, vải sofa có độ sần nhẹ).
- Mô tả ánh sáng: Luôn là ánh sáng ban ngày tự nhiên, dịu nhẹ, chiếu qua cửa sổ, tạo cảm giác mềm mại, không có bóng đổ gắt.
- Góc camera: Mô tả góc camera trùng khớp với ảnh gốc.
- Cấm kỵ: Tuyệt đối không mô tả bối cảnh bên ngoài (ví dụ: view nhìn ra thành phố, sân vườn...).

Quan trọng: Chỉ trả về nội dung của promt, không thêm bất kỳ lời dẫn hay câu giới thiệu nào.`,
            generateFromKeywordsInterior: `Hãy đóng vai một chuyên gia thiết kế nội thất và dựng hình 3D. Từ các từ khóa do người dùng cung cấp về một không gian nội thất, hãy viết một promt chi tiết dưới 100 từ, tập trung vào các yếu tố sau:
- Phong cách thiết kế dựa trên từ khóa.
- Mô tả chi tiết, nhấn mạnh vào sự chân thực của vật liệu (ví dụ: vân gỗ sồi tự nhiên, bề mặt đá marble bóng mờ, vải sofa có độ sần nhẹ).
- Mô tả ánh sáng: Luôn là ánh sáng ban ngày tự nhiên, dịu nhẹ, chiếu qua cửa sổ, tạo cảm giác mềm mại, không có bóng đổ gắt.
- Mô tả một góc camera phù hợp.
- Cấm kỵ: Tuyệt đối không mô tả bối cảnh bên ngoài (ví dụ: view nhìn ra thành phố, sân vườn...).

Từ khóa của người dùng: "{0}"

Quan trọng: Chỉ trả về nội dung của promt, không thêm bất kỳ lời dẫn hay câu giới thiệu nào.`,
            generateWithReference: `Promt của người dùng là: "{0}". Với vai trò là một AI render kiến trúc, nhiệm vụ của bạn là kết hợp một bản phác thảo cấu trúc với một ảnh tham chiếu phong cách. Ảnh đầu tiên là bản phác thảo cấu trúc. Ảnh thứ hai là ảnh tham chiếu về phong cách, ánh sáng, cảnh quan và vật liệu. Bạn phải áp dụng không khí, ánh sáng, bảng màu, vật liệu và cảnh quan xung quanh từ ảnh thứ hai vào công trình từ bản phác thảo đầu tiên. Nghiêm cấm sao chép hình dạng kiến trúc chính từ ảnh tham chiếu phong cách thứ hai, nhưng bạn nên áp dụng môi trường tổng thể và kết cấu của nó. Kết quả render cuối cùng phải là một ảnh ngoại thất dựa trên promt của người dùng.`,
            generateWithReferenceNegative: `Promt của người dùng là: "{0}". Với vai trò là một AI render kiến trúc, nhiệm vụ của bạn là kết hợp một bản phác thảo cấu trúc với một ảnh tham chiếu phong cách. Ảnh đầu tiên là bản phác thảo cấu trúc. Ảnh thứ hai là ảnh tham chiếu về phong cách, ánh sáng, cảnh quan và vật liệu. Bạn phải áp dụng không khí, ánh sáng, bảng màu, vật liệu và cảnh quan xung quanh từ ảnh thứ hai vào công trình từ bản phác thảo đầu tiên. Nghiêm cấm sao chép hình dạng kiến trúc chính từ ảnh tham chiếu phong cách thứ hai, nhưng bạn nên áp dụng môi trường tổng thể và kết cấu của nó. Kết quả render cuối cùng phải là một ảnh ngoại thất dựa trên promt của người dùng. QUAN TRỌNG: Người dùng đã chỉ định những điều cần TRÁNH. Bạn tuyệt đối KHÔNG ĐƯỢỢC bao gồm bất kỳ yếu tố nào sau đây trong hình ảnh: "{1}".`,
            generateWithoutReference: `Promt của người dùng là: "{0}". Bạn đang tạo một bản render kiến trúc thực tế. Hình ảnh được cung cấp là một bản phác thảo cấu trúc. Hãy tạo ra một hình ảnh chân thực dựa trên bản phác thảo này và promt của người dùng.`,
            generateWithoutReferenceNegative: `Promt của người dùng là: "{0}". Bạn đang tạo một bản render kiến trúc thực tế. Hình ảnh được cung cấp là một bản phác thảo cấu trúc. Hãy tạo ra một hình ảnh chân thực dựa trên bản phác thảo này và promt của người dùng. QUAN TRỌNG: Người dùng đã chỉ định những điều cần TRÁNH. Bạn tuyệt đối KHÔNG ĐƯỢỢC bao gồm bất kỳ yếu tố nào sau đây trong hình ảnh: "{1}".`,
            generateFromImage: `Hãy đóng vai một chuyên gia thiết kế nội thất và kiến trúc với 20 năm kinh nghiệm và chuyên gia dựng hình 3D. Từ ảnh 3D/phác thảo được cung cấp, hãy viết một promt chi tiết dưới 100 từ theo cấu trúc sau, bổ sung yếu tố điện ảnh/nhiếp ảnh:
- Ảnh chụp thực tế của [dạng công trình], phong cách thiết kế, mô tả kỹ về vật liệu, tính chất vật liệu của đối tượng chính.
- Tự sáng tạo bao cảnh và bối cảnh cho phù hợp.
- Ánh sáng: Mô tả rõ ràng về ánh sáng (ví dụ: Ánh sáng Volumetric God Rays, Golden Hour, Ánh sáng Low-Key), góc máy (Wide Shot, Low Angle), và độ sâu trường ảnh (Depth of Field).
- Ưu tiên các bối cảnh ở Việt Nam, hãy lựa chọn bối cảnh và ánh sáng làm sao để kết quả ảnh đầu ra có bối cảnh và ánh sáng giống ảnh chụp thực tế ở Việt Nam nhất.
- Mô tả góc camera đúng với góc camera ảnh tải lên.

Ví dụ: Ảnh chụp kiến trúc thực tế của biệt thự Tân Cổ Điển. Tường thạch cao màu kem, ban công sắt mỹ thuật đen. Bối cảnh: Đường phố nội đô Sài Gòn, có dây điện/cáp treo và cây xanh đô thị. Ánh sáng mặt trời 10 giờ sáng (ánh nắng gắt, cường độ cao) chiếu thẳng từ trên cao, tạo bóng đổ sắc nét. Góc máy Wide Shot, thể hiện góc nhìn từ dưới lên.

Quan trọng: Chỉ trả về nội dung của promt, không thêm bất kỳ lời dẫn hay câu giới thiệu nào.`,
            generateFromKeywords: `Hãy đóng vai một chuyên gia thiết kế nội thất và kiến trúc với 20 năm kinh nghiệm và chuyên gia dựng hình 3D. Từ các từ khóa do người dùng cung cấp, hãy viết một promt chi tiết dưới 100 từ theo cấu trúc sau, bổ sung yếu tố điện ảnh/nhiếp ảnh:
- Ảnh chụp thực tế của [dạng công trình], phong cách thiết kế, mô tả kỹ về vật liệu, tính chất vật liệu của đối tượng chính.
- Tự sáng tạo bao cảnh và bối cảnh cho phù hợp dựa trên các từ khóa.
- Ánh sáng: Mô tả rõ ràng về ánh sáng (ví dụ: Ánh sáng Volumetric God Rays, Golden Hour, Ánh sáng Low-Key), góc máy (Wide Shot, Low Angle), và độ sâu trường ảnh (Depth of Field).
- Ưu tiên các bối cảnh ở Việt Nam, hãy lựa chọn bối cảnh và ánh sáng làm sao để kết quả ảnh đầu ra có bối cảnh và ánh sáng giống ảnh chụp thực tế ở Việt Nam nhất.
- Mô tả một góc camera phù hợp.

Từ khóa của người dùng: "{0}"

Ví dụ: Nếu người dùng nhập "biệt thự tân cổ điển, sài gòn", bạn có thể viết: "Ảnh chụp kiến trúc thực tế của biệt thự Tân Cổ Điển. Tường thạch cao màu kem, ban công sắt mỹ thuật đen. Bối cảnh: Đường phố nội đô Sài Gòn, có dây điện/cáp treo và cây xanh đô thị. Ánh sáng mặt trời 10 giờ sáng (ánh nắng gắt, cường độ cao) chiếu thẳng từ trên cao, tạo bóng đổ sắc nét. Góc máy Wide Shot, thể hiện góc nhìn từ dưới lên."

Quan trọng: Chỉ trả về nội dung của promt, không thêm bất kỳ lời dẫn hay câu giới thiệu nào.`,
            editWithReference: `**CRITICAL INPAINTING DIRECTIVE WITH STYLE REFERENCE**
You are performing a high-fidelity inpainting operation. Adherence to the mask and style reference is the highest priority.

You are given three images in this order:
1.  **Original Image**: The base image to be modified.
2.  **Mask Image**: A black and white image. Your modifications are **STRICTLY AND EXCLUSIVELY** confined to the **WHITE** area.
3.  **Style Reference Image**: An image providing style guidance.

**Your Task**:
1.  **Forbidden Zone**: The **BLACK** area of the mask is a **NO-CHANGE ZONE**. The pixels in this area on the output image **MUST BE IDENTICAL** to the original.
2.  **User's Request**: Within the white-masked area, apply the following change based on the user's promt: "{0}".
3.  **Style Application**: While applying the change, you **MUST** adopt the style, texture, lighting, color palette, and materials from the **Style Reference Image**. Do not copy shapes or objects from the reference, only its aesthetic qualities.
4.  **Final Output**: Produce a single image where the user's request is fulfilled inside the white mask with the specified style, and the black-masked area is a perfect, unaltered copy of the original. The transition must be seamless.`,
            editWithoutReference: `**CRITICAL INPAINTING DIRECTIVE**
Your task is to perform a high-fidelity inpainting operation. Adherence to the mask is the highest priority.

1.  **Primary Rule**: You are given two images: an original image and a mask image. Your modifications are **STRICTLY AND EXCLUSIVELY** confined to the **WHITE** area of the mask image.
2.  **Forbidden Zone**: The **BLACK** area of the mask is a **NO-CHANGE ZONE**. The pixels in this area on the output image **MUST BE IDENTICAL** to the pixels in the same area on the original input image. Any alteration, however minor, in the black-masked region is a failure of the task.
3.  **User's Request**: Within the white-masked area, apply the following change based on the user's promt: "{0}".
4.  **Final Output**: Produce a single image where the user's request is fulfilled inside the white mask, and the black-masked area is a perfect, unaltered copy of the original. The transition must be seamless.`,
            placeAndRenderFurniture: `
**CRITICAL PHOTOREALISTIC COMPOSITION TASK: INTELLIGENT SCALING**

You are a master AI of optical art and photorealistic composition with an expert understanding of 3D perspective and real-world object proportions. Your primary task is to seamlessly and **realistically** integrate one or more objects into a background image.

**Inputs:**
1.  **Background Image**: The main scene.
2.  **Object(s) to Place**: Subsequent images to be placed into the background. These can be any type of object: furniture, architectural structures, people, plants, etc.
3.  **Placement Instructions (JSON)**: A JSON object providing the user's **initial placement guide**. These are suggestions for placement, not strict commands for scale. Realism is more important than adhering to a potentially incorrect user-provided scale.
    - \`pos\`: The \`{x, y}\` coordinates (in %) for the object's **center**. This is a **NON-NEGOTIABLE** target location. The object must be rendered centered at this point, but grounded realistically on the nearest surface (floor, table, wall).
    - \`scale\`: The user's **initial estimate** for the object's width. **This value MUST be overridden if it violates realism.**
    - \`rotation\`: The user's suggested rotation. You should adjust this to match the surface and perspective.
    - \`orientation\`: Flip states.

**Your Task:**
1.  **Analyze the Background in 3D**: Deeply analyze the scene to infer its 3D geometry. Identify perspective lines, vanishing points, light sources, and the scale of known objects (e.g., doors, windows, chairs).
2.  **Place and Render**: Place each object centered on its specified \`pos\` coordinate.
3.  **INTELLIGENT SCALE & PERSPECTIVE CORRECTION (HIGHEST PRIORITY)**:
    - **This is your most critical function.** The user's manual placement might be inaccurate. You **MUST** intelligently correct the scale and perspective of each placed object to make it physically plausible within the scene.
    - **Depth Analysis**: Use the object's 'y' position and the scene's perspective lines to determine its depth (foreground, midground, background).
    - **Automatic Proportional Sizing**: Based on the object's calculated depth, you **MUST** automatically adjust its size to be perfectly proportional to other objects in the scene. **For example, if the user places a decorative lamp that appears too large for the bedroom it's in, you are REQUIRED to shrink it to a realistic, appropriate size.** This correction is mandatory.
    - **Perspective Alignment**: Warp and transform the object so its perspective perfectly matches the vanishing points of the background. It must look like it exists in the 3D space, not just pasted on top.
4.  **Photorealistic Integration**: After correcting the scale and perspective, perform all other integration tasks to the highest standard:
    - **Total Lighting and Material Integration**: Discard the object's original lighting. Re-light it entirely based on the background's light sources, considering its material properties (translucency, reflection, sub-surface scattering).
    - **Shadow Casting**: Cast physically accurate shadows onto the background and other objects. The object must also receive shadows from the scene.
    - **Advanced Edge and Color Harmony**: Perform pixel-perfect edge blending, eliminate color fringing, match atmospheric conditions, and unify the color palette.
5.  **Final Output**: Produce a single, photorealistic composition. **DO NOT** include any text, JSON, or annotations in the output image. Only the final rendered scene is required.

**Placement Data:**
\`\`\`json
{0}
\`\`\`
`,
            generateArchitecturalPrompts: `Đóng vai một nhiếp ảnh gia chuyên nghiệp với hơn 20 năm kinh nghiệm trong lĩnh vực chụp ảnh kiến trúc, nội thất, cảnh quan, quy hoạch và resort, từng đạt nhiều giải thưởng nhiếp ảnh quốc tế.

Bạn đồng thời là một chuyên gia Prompt Engineer & AI Visual Prompt Designer, am hiểu sâu về ngôn ngữ mô tả hình ảnh, bố cục thị giác, ánh sáng, không gian, tỷ lệ và cảm xúc hình ảnh trong các tạp chí kiến trúc hàng đầu thế giới như ArchDaily, Dezeen, Architectural Digest, Wallpaper, Dwell…

Tôi sẽ tải lên một hình ảnh công trình (kiến trúc hoặc nội thất). Hãy tưởng tượng bạn đang thật sự đứng trong không gian đó với chiếc máy ảnh chuyên dụng (Canon R5 hoặc Nikon Z9, ống kính tilt-shift và ống kính góc rộng – tele tuỳ cảnh).

Dựa trên kinh nghiệm nhiếp ảnh quốc tế và phong cách hình ảnh của các tạp chí kiến trúc đương đại, hãy phân tích hình ảnh được tải lên, rồi đề xuất cho tôi 20 góc chụp nghệ thuật ấn tượng nhất của công trình này.

Mỗi góc chụp được viết dưới dạng prompt tạo ảnh cho AI Nano Banana, mô tả cụ thể về góc máy, ánh sáng, thời tiết, bố cục, ống kính, cảm xúc hình ảnh, không viết dưới dạng JSON.

Phân chia rõ 4 nhóm góc như sau:

1️⃣ 5 góc toàn cảnh (wide shots)
• Diễn tả tổng thể công trình và cảnh quan xung quanh.
• Mỗi góc nên có hiệu ứng ánh sáng và thời tiết khác nhau: bình minh, buổi trưa, hoàng hôn, đêm, trời mưa hoặc sương sớm.
• Nêu rõ hướng sáng, góc chụp (ví dụ: chụp từ trên cao, ngang tầm mắt, chéo góc 45 độ, từ phía lối vào…).

2️⃣ 5 góc trung cảnh (medium shots)
• Tập trung vào mối quan hệ giữa không gian và con người. Mỗi góc chụp PHẢI có yếu tố con người trong đó (ví dụ: một người đang đọc sách, đi dạo, hoặc tương tác với không gian).
• Mô tả bố cục, chiều sâu, phối cảnh ánh sáng, chất liệu, bóng đổ, tương phản.

3️⃣ 5 góc cận cảnh (close-up shots)
• Nhấn mạnh vào chi tiết nổi bật, vật liệu, ánh sáng chiếu rọi, phản xạ, hoặc sự tinh tế của thiết kế.
• Có thể là ánh sáng hắt qua rèm, bề mặt vật liệu, tay nắm cửa, kết cấu gỗ, ánh phản chiếu trên mặt nước…

4️⃣ 5 góc máy nghệ thuật (artistic shots)
• Lấy nét vào các đối tượng chính như người, lá cây, chim, xe cộ. Đối tượng lấy nét sẽ chiếm tỉ lệ lớn trong khung hình. Công trình chính sẽ bị làm mờ (blur) ở phía sau, tạo hiệu ứng chiều sâu (foreground – background tách biệt).

Yêu cầu chi tiết cho mỗi góc chụp:
• Viết bằng tiếng Việt mô tả ngắn gọn, súc tích, gợi hình mạnh.
• Không dùng định dạng JSON, chỉ mô tả text.
• Ưu tiên dùng ngôn ngữ cảm xúc, thị giác và kỹ thuật nhiếp ảnh (ví dụ: ánh sáng xiên, khung hình dẫn mắt, tiền cảnh mờ, hậu cảnh sâu, góc ống kính tilt-shift, dynamic composition, depth of field, cinematic tone…).
• Mục tiêu: tái hiện cảm xúc, ánh sáng và nghệ thuật nhiếp ảnh chân thực nhất – giúp AI Nano Banana tạo ra hình ảnh sống động, có chiều sâu, mang phong cách nhiếp ảnh chuyên nghiệp và tạp chí quốc tế.
Quan trọng: Chỉ trả về 4 nhóm góc chụp như đã yêu cầu. Không thêm bất kỳ lời dẫn, giới thiệu, hay kết luận nào.`,
            generateFromPlan: `Từ giờ, bạn hãy đóng vai một chuyên gia thiết kế nội thất đồng thời là chuyên gia viết prompt tạo ảnh cho các AI tạo hình (như Midjourney, DALL-E, v.v.). Bạn có kỹ năng chuyên sâu về bố cục, hình khối, và phân tích mặt bằng kiến trúc.

Nhiệm vụ của bạn là:

Tự nhận định loại phòng dựa trên mặt bằng tôi tải lên (ví dụ: Phòng Khách, Phòng Ngủ Master, Bếp & Phòng Ăn).

Phân tích mặt bằng để xác định vị trí các đồ đạc chính (giường, sofa, tủ, bàn ăn, bếp, v.v.) và góc nhìn chính diện tiêu chuẩn.

Viết prompt tạo ảnh (bằng tiếng Việt) theo format nghiêm ngặt sau:

Góc nhìn: Luôn là góc nhìn chính diện (trực diện), không mô tả hướng nhìn camera phức tạp (ví dụ: không dùng "nhìn từ dưới lên").

Nội dung: Mô tả vị trí và loại đồ đạc có trong khung hình theo góc nhìn chính diện.

Cấm kỵ: Tuyệt đối không mô tả màu sắc, vật liệu, chất liệu. Không mô tả đồ vật nằm ngoài khung hình chính diện (ví dụ: trong phòng ngủ nhìn đầu giường thì không mô tả kệ TV).

Format đầu ra: Chỉ hiển thị duy nhất prompt đã hoàn chỉnh, bắt đầu bằng cụm từ:

Tạo phối cảnh nội thất view nhìn chính diện của không gian mặt bằng. Đó là [Loại phòng bạn đã nhận định]. View nhìn trực diện vào... [Mô tả chi tiết vị trí đồ đạc]. Sử dụng hình moodboard làm tham chiếu cho phối cảnh nội thất này. Hãy làm cho nó chân thực như một hình ảnh trực quan kiến trúc với các kết cấu và chi tiết cụ thể.

không được hiển thị phần phân tích chỉ được hiển thị phần Prompt`,
            generateMoodboard: "Với vai trò là một nhà thiết kế nội thất chuyên nghiệp, hãy dựa vào hình ảnh và chủ đề do người dùng cung cấp: '{0}'. Nhiệm vụ của bạn là tạo ra một moodboard đẹp mắt. Moodboard phải bao gồm: một bảng màu được trích xuất từ hình ảnh, các hình ảnh truyền cảm hứng phù hợp với chủ đề, các mẫu vật liệu (vải, gỗ, kim loại), và các từ khóa liên quan. Sắp xếp các yếu tố này trong một bố cục sạch sẽ, hiện đại. Đầu ra cuối cùng phải là một hình ảnh moodboard duy nhất, gắn kết.",
            generateMoodboardWithReference: "Với vai trò là một nhà thiết kế chuyên nghiệp, bạn được cung cấp 2 hình ảnh và 1 chủ đề. HÌNH ẢNH 1 là nguồn cảm hứng chính cho **chủ đề và đối tượng**. HÌNH ẢNH 2 là nguồn tham chiếu cho **phong cách, bảng màu, và không khí**. Chủ đề là: '{0}'. Nhiệm vụ của bạn là tạo ra một moodboard đẹp mắt, kết hợp cả hai yếu tố. Moodboard phải bao gồm: một bảng màu được trích xuất từ **hình ảnh tham chiếu phong cách**, các hình ảnh truyền cảm hứng phù hợp với **chủ đề từ hình ảnh chính**, các mẫu vật liệu (vải, gỗ, kim loại), và các từ khóa liên quan. Sắp xếp các yếu tố này trong một bố cục sạch sẽ, hiện đại. Đầu ra cuối cùng phải là một hình ảnh moodboard duy nhất, gắn kết."
        }
    },
    en: {
        // App-wide
        appTitle: "AIcomplex",
        developedBy: "Developed by AIAI Studio",
        sponsoredBy: "Development sponsored by VietCG",
        changeLanguage: "Change Language",

        // Welcome Screen
        welcomeHeader: "AIcomplex",
        welcomeDescription: "AI application for architecture and interior design. Turn your ideas into reality with the power of artificial intelligence.",
        welcomeStartButton: "Get Started",
        
        // Top Nav Bar
        tabCreate: "Create Image",
        tabCameraAngle: "Camera Angle",
        tabEdit: "Edit Image",
        tabPlanTo3D: "Plan to 3D",
        tabCanvaMix: "Canva Mix",
        tabCreatePrompt: "Magic Prompt",
        tabCreateVideo: "Create Video",
        tabUtilities: "Utilities",

        // Control Panel
        uploadImage: "Upload Image",
        uploadImageOptional: "Upload Image (Optional)",
        handDrawnHint: "Hand-drawn images or SketchUp models without shadows are preferred.",
        referenceImage: "Reference Image (Style)",
        prompt: "Prompt",
        negativePrompt: "Negative Prompt",
        negativePromptHelp: "List things you don't want to see in the image. e.g., ugly, deformed, low quality, blurry, signature...",
        aspectRatio: "Aspect Ratio",
        imageCount: "Number of Images",
        dropzoneHint: "Drag & drop, paste, or click",
        dropzoneFormats: "PNG, JPG, WEBP",
        delete: "Delete",
        choosePresetImage: "Choose from presets",
        close: "Close",
        referenceImageHelp: "The AI will draw inspiration for style, lighting, context, and materials.",
        processingImage: "Processing image...",
        addFromPresets: "Or add from preset prompts:",
        style: "Style",
        context: "Context",
        lighting: "Lighting",
        aspectRatioHelp: "Only effective when 'Source Image' is not uploaded.",
        generateFromImage: "Generate from Image",
        generateFromPromptText: "Generate from Prompt",
        generating: "Generating...",
        specifyCloseUpAngle: "Specify Close-up Angle (Optional)",
        specifyCloseUpHelp: "Draw a rectangle on the image for the AI to automatically render a close-up of that area.",
        selectArea: "Select Area",
        cancel: "Cancel",
        clearSelection: "Clear Selection",
        chooseCameraAngle: "Choose Camera Angle",
        selectCameraAnglePlaceholder: "-- Select a camera angle --",
        customDescription: "Custom Description",
        customDescriptionPlaceholder: "e.g., shot from a 3/4 low angle...",
        chooseFunction: "Choose Function",
        editSelectedArea: "Edit Selection",
        mergeHouse: "Merge House",
        mergeMaterial: "Change Material",
        mergeFurniture: "Change Furniture",
        editFunctionHelp: {
            inpaint: "Remove or replace objects by drawing a selection and entering a description.",
            mergeHouse: "Merge a new building into an existing context.",
            mergeMaterial: "Apply material from the second image to an object in the source image.",
            mergeFurniture: "Replace furniture in the source image with items from the second image."
        },
        uploadSourceImage: "Upload Source Image",
        uploadContextImage: "Upload Context Image (Image 1)",
        contextImageHelp: "The context image with the area for merging painted in red.",
        resetImage: "Delete Image & Restart",
        chooseToolAndDraw: "Choose Tool & Draw Selection",
        lassoTool: "Lasso",
        brushTool: "Brush",
        lineThickness: "Line Thickness",
        brushSize: "Brush Size",
        uploadReferenceOptional: "Upload Reference Image (Optional)",
        referenceImageHelpEdit: "The AI will take inspiration from this image to modify the selected area.",
        uploadBuildingImage: "Upload Building Image (Image 2)",
        uploadMaterialFurnitureImage: "Upload Material/Furniture Image (Image 2)",
        image2Help: "Note: Use a background-removed image and match the aspect ratio of Image 2 to Image 1.",
        promptPlaceholder: {
            create: "e.g., a modern house, daylight, realistic photo...",
            negative: "e.g., text, signature, low quality, noise",
            inpaint: "e.g., add an arched window...",
            mergeHouse: "Describe how to merge the images...",
            mergeMaterial: "e.g., replace the rug in image 1 with the patterned rug in image 2",
            mergeFurniture: "Describe how to merge the images...",
            planTo3dRender: "Modern living room...",
            planTo3dColorize: "Pastel color scheme...",
            video: "Describe the motion...",
            videoPrompt: "e.g., a slow flycam shot approaching the building from a distance..."
        },
        promptExamples: "Or select a sample prompt:",
        selectOption: "-- Select an option --",
        upload2dPlan: "Upload 2D Plan",
        chooseGoal: "Choose Goal",
        create3DImage: "Create 3D Image",
        colorizePlan: "Colorize Plan",
        suggestions: "Suggestions",
        chooseModel: "Choose Model",
        veo2NoKey: "Veo 2 (No separate key needed)",
        veo31Fast: "Veo 3.1 (Fast)",
        veo31HighQuality: "Veo 3.1 (High Quality)",
        motionDescription: "Motion Description",
        selectSuggestion: "-- Select a suggestion --",
        uploadSpaceImage: "Upload Space Image (Background)",
        changeBgImage: "Change Background Image",
        clickOrDropNew: "Click or drag a new image",
        deleteAll: "Delete All",
        uploadDecorImage: "Upload Decor Images (BG removed)",
        decorHelp: "Using PNGs with transparent backgrounds is recommended",
        clickToAdd: "Click to add to canvas",
        adjustments: "Adjustments",
        lockLayout: "Lock Layout",
        deleteObject: "Delete object (or use Backspace key)",
        rotate: "Rotate",
        flipHorizontal: "Flip Horizontal",
        flipVertical: "Flip Vertical",
        uploadToAnalyze: "Upload Image to Analyze",
        analyzeHelp: "The AI will analyze the image and create 20 professional photography prompts.",
        uploadStartImage: "Upload Starting Image",
        virtualTourHelp: "Upload a 3D render to begin your virtual tour.",
        createImage: "Generate Image",
        createVideo: "Generate Video",
        createPrompt: "Generate Prompt",

        // Gallery
        loadingStart: "Starting generation process...",
        loadingAnalyzePrompts: "Analyzing image and creating prompts...",
        loadingMessageDefault: "Generating images, please wait a moment...",
        loadingUsageLimit: "AIcomplex Usage Limit:",
        loadingUsageText: "Each user can generate 40–45 images per day. To increase your generation count, you can use 2–3 different Gmail accounts.",
        loadingUsageNote: "👉 Note: Each email should be logged in on a separate browser or Chrome profile to avoid account conflicts.",
        loadingVideoHeader: "The AI is creating your video...",
        loadingVideoHelp: "Video generation can take a few minutes. Please do not close or reload the page.",
        loadingPromptHeader: "Generating prompts...",
        loadingPromptHelp: "The AI is analyzing your image to create unique photography descriptions.",
        emptyStateHeader: "Render Results",
        emptyStateText: "Your results will appear here.",
        emptyCanvaHeader: "Your Creative Space",
        emptyCanvaText: "Upload a 'space image' in the control panel to begin.",
        emptyPromptHeader: "Professional Prompt Suggestions",
        emptyPromptText: "Upload an image in the control panel and the AI will generate 20 prompts in a photographer's style.",
        emptyTourHeader: "Virtual Tour",
        emptyTourText: "Upload a render in the control panel to start your tour.",
        tourHistory: "Tour History",
        fullscreen: "Fullscreen",
        editThisImage: "Edit this image",
        useAsSource: "Use as source image",
        downloadImage: "Download image",
        downloadVideo: "Download video",
        copyPrompt: "Copy prompt",
        noPrompt: "No prompt available",
        createFromThisPrompt: "Generate from this prompt",
        tourUndo: "Undo",
        tourRedo: "Redo",

        // History
        history: "History",
        clearAll: "Clear All",
        clearHistoryConfirm: "Are you sure you want to delete all history?",
        review: "Review",
        images: "images",
        prompts: "Prompts",
        historyEmpty: "Results from previous generations will be saved here.",

        // Fullscreen Viewer
        closeFullscreen: "Close",
        editImage: "Edit Image",
        reset: "Reset",
        saveImage: "Save Image",

        // Veo API Key Screen
        apiKeyRequired: "API Key Required",
        apiKeyDescription: "To use the video generation feature, you need to select an API Key from your Google Cloud project. This feature uses the Veo model and may incur costs.",
        apiKeyBillingInfo: "For more information on pricing, please refer to the",
        billingDocs: "billing documentation",
        selectApiKey: "Select API Key",

        // Alerts
        alertUploadSource: "Please upload a source image.",
        alertDrawMask: "Please draw a selection on the image to edit.",
        alertUploadBothImages: "Please upload both images to proceed.",
        alertUploadBg: "Please upload a space image (background).",
        alertUploadDecor: "Please upload at least one decor image.",
        alertEnterPrompt: "Please enter a description (prompt).",
        alertGenerationFailed: "An error occurred during generation. Please check your API key and try again.",
        alertInvalidApiKey: "Invalid or deleted API Key. Please select a different API Key.",
        alertNoSourceForPrompt: "Could not find the source image from the Create Prompt tab. Please try again.",
        alertImageGenFailedRetry: "An error occurred while generating the image. Please try again.",
        alertTourFailed: "An error occurred while generating the next frame.",
        alertApiKeyUtilUnavailable: "API Key selection utility is not available.",
        alertImageGenFailed: "The AI did not return any images.",
        alertMoodboard: "Please upload an inspiration image and enter a theme description.",
        alertLighting: "Please upload an image and select at least one lighting type.",
        alertVideoPrompt: "Please upload a source image and enter a motion request.",

        // Social Links
        donate: "Donate",
        
        // Default prompt text
        promptInitial: "A realistic photo of a house",
        promptPlanTo3d: "Create a realistic, eye-level 3D interior render from this 2D floor plan",
        promptCloseUp: "Take a close-up shot of the selected area.",
        promptCanvaMix: "Canva Mix generation",
        promptArchitecturalGenerated: "Generated Architectural Prompts",
        defaultNegativePrompt: "cartoon, 2d illustration, sketch, cgi, render artifact, fake render, unreal engine style, game asset, lowpoly, plastic surface, wax texture, flat lighting, incorrect reflections, overexposed, underexposed, low contrast, washed out, noisy, blurry, depth map error, distorted perspective, unrealistic scale, fake shadows, wrong proportion, low resolution, low detail, low quality, over-saturated, oversharpened edges, halo, outline, glowing edges, bad composition, incorrect DOF, cutout, text, watermark, logo, posterized, painting, drawing, toy-like, artificial lighting, non-realistic material, duplicated objects, blurry wall texture, flat materials, poor texture mapping, distorted lines, model border",

        // Utilities
        utilitiesTitle: "Extended Utilities",
        moodboardTitle: "Create Moodboard",
        moodboardDesc: "Upload an image and enter a description for the AI to create a complete moodboard with a color palette, materials, and related images.",
        videoPromptTitle: "Video Scenarios",
        videoPromptDesc: "Generate detailed motion scripts for architectural videos.",
        lightingTitle: "Lighting Setup",
        lightingDesc: "Test different lighting scenarios for your model.",
        virtualTourTitle: "Virtual Tour",
        virtualTourDesc: "Upload a 3D render and navigate through the space using AI.",
        comingSoon: "Coming Soon",
        backToUtilities: "Back to Utilities",
        uploadInspirationImage: "1. Upload Inspiration Image",
        uploadReferenceImage: "2. Upload Reference Image (Style)",
        moodboardPromptHelp: "3. Describe the theme or style",
        moodboardReferenceHelp: "The AI will draw color and style inspiration from this image.",
        moodboardImageCount: "4. Number of Results",
        generateMoodboardButton: "Generate Moodboard",
        moodboardEmptyHeader: "Your Moodboard",
        moodboardEmptyText: "Upload an image and enter a prompt to get started.",
        generatingMoodboard: "Generating moodboard...",
        moodboardSamplePrompt: "Use sample prompt",
        moodboardSamplePromptText: "create a furniture moodboard, separating each piece with a white background. There will be a central overall image, below will be the separated furniture pieces (bed, nightstand, wardrobe, lamp, rug, curtain), on the right will be the color palette and materials, all neatly arranged in a vertical frame with a white background.",
        // Lighting Setup Utility
        uploadModelImage: "1. Upload Model Image",
        chooseLighting: "2. Choose Lighting Type",
        interiorLighting: "Interior Lighting",
        exteriorLighting: "Exterior Lighting",
        generateLightingButton: "Generate with New Lighting",
        lightingEmptyHeader: "Your Lighting Space",
        lightingEmptyText: "Upload an image to start testing lighting scenarios.",
        generatingLighting: "Generating new image...",
        // Video Prompt Utility
        motionRequest: "2. Motion Request (in Vietnamese)",
        generatingVideoPrompt: "Generating video prompt...",
        generatedVideoPromptTitle: "Generated Prompt (English)",
        videoPromptEmptyHeader: "Your Video Script",
        videoPromptEmptyText: "Upload an image and enter a request for the AI to create a professional video prompt.",

        constants: {
            interiorLightingOptions: [
                { display: "-- Select interior lighting --", value: "" },
                { display: "Natural Daylight from Window", value: "soft natural daylight streaming through a large window" },
                { display: "Warm Ceiling Lights (Yellow)", value: "warm yellow light from a system of downlights and recessed lighting" },
                { display: "Studio Lighting (White)", value: "even, soft white light as in a studio, with no harsh shadows" },
                { display: "Sunset Glow into Room", value: "warm orange sunset light streaming into the room at an angle, creating long shadows" },
                { display: "Nighttime (Lamps & Moonlight)", value: "nighttime lighting combining interior lamps and soft blue moonlight from outside" },
                { display: "Artistic: Mystical Cinematic", value: "cinematic lighting with god rays piercing through a thin haze, creating a mystical atmosphere and depth" },
                { display: "Artistic: Contrasting Neon", value: "high-contrast neon lighting in pink and cyan, creating a cyberpunk or retro-futuristic style" },
                { display: "Artistic: Cozy Fireplace", value: "warm, flickering light from a burning fireplace, casting soft shadows and creating a cozy, intimate atmosphere" },
                { display: "Artistic: Dramatic Low-key", value: "low-key lighting with a single main light source, creating high contrast between light and shadow, highlighting forms and creating a dramatic feel" },
                { display: "Artistic: Nordic 'Hygge'", value: "soft, diffused light from multiple small lamps and candles, creating a relaxing and cozy Nordic 'hygge' feeling" }
            ],
            exteriorLightingOptions: [
                { display: "-- Select exterior lighting --", value: "" },
                { display: "Harsh Midday Sun", value: "harsh midday daylight, clear blue sky, creating sharp, defined shadows" },
                { display: "Golden Hour Sunset", value: "vibrant golden hour sunset, with a sky of orange and purple clouds" },
                { display: "Crisp Early Morning", value: "crisp early morning light, with a hint of mist, peaceful atmosphere" },
                { display: "Overcast, Pre-storm", value: "overcast sky, grey clouds, soft diffused light, no harsh shadows" },
                { display: "Night, Urban Lights", value: "nighttime city scene, building illuminated by streetlights and light from surrounding buildings" },
                { display: "Artistic: Dramatic Storm", value: "a dramatic stormy sky with distant lightning flashes, illuminating the building intermittently and powerfully" },
                { display: "Artistic: Misty Forest", value: "the building is enveloped in a mystical foggy forest, with sunlight diffusing through the canopy and mist" },
                { display: "Artistic: Cyberpunk City Rain", value: "a rainy night in a cyberpunk city, with neon light from signs reflecting off puddles and the wet surfaces of the building" },
                { display: "Artistic: Desert Mirage", value: "harsh desert light creating a heat mirage effect, slightly distorting the air around the base of the building" },
                { display: "Artistic: Northern Lights", value: "the night sky is illuminated by the aurora borealis (northern lights) with mystical green and purple bands of color" }
            ],
            predefinedReferenceImages: {
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
                planning: [],
            },
            ASPECT_RATIO_LABELS: { auto: 'Auto', '1:1': 'Square (1:1)', '4:3': 'Landscape (4:3)', '3:4': 'Portrait (3:4)', '16:9': 'Widescreen (16:9)', '9:16': 'Story (9:16)' },
            stylePrompts: ["modern style", "minimalist style", "neoclassic style", "Indochine style", "industrial style", "Scandinavian style"],
            contextPrompts: ["on a Vietnamese street", "in a Vietnamese countryside", "in a luxurious, modern urban area like Vinhomes, Hanoi", "at a Vietnamese street intersection", "in a tropical garden in the Vietnamese countryside", "next to a paved road with green trees on both sides", "in a large European garden with stone paths, statues, and topiary", "at the foot of a majestic mountain, surrounded by a lush garden and colorful autumn leaves, with a swimming pool and manicured lawn in front"],
            lightingPrompts: ["Natural daylight, clear blue sky", "Warm sunset light, casting long shadows", "Nighttime, moonlight illuminating the scene, highlighting interior and exterior lights", "Overcast sky, soft light, no harsh shadows", "dawn with clear light and a peaceful atmosphere.", "purple sunset with shimmering interior lights.", "dense early morning fog creating a mystical feel.", "after a rain with slightly wet roads and light clouds in the sky"],
            cameraAnglePrompts: [{ display: "High-angle shot", value: "High-angle shot, looking down"}, { display: "Low-angle (majestic feel)", value: "Low-angle shot from below, making the building feel tall and majestic"}, { display: "3/4 view from left", value: "3/4 view from the left, showing depth, maintaining the context of a Vietnamese street, neighboring houses, and a blue sky."}, { display: "Wide long shot", value: "Wide long shot, showing the entire surrounding landscape"}, { display: "Detailed close-up shot", value: "Detailed close-up shot"}, { display: "3/4 view from right", value: "3/4 view from the right, showing depth, maintaining the context of a Vietnamese street, neighboring houses, and a blue sky."}, { display: "Symmetrical front view", value: "symmetrical front view of the facade, straight-on perspective"}],
            planStylePrompts: ["modern style, white and wood tones", "minimalist style, smart furniture", "scandinavian style, natural light", "luxury style, high-end materials like marble, gold-plated metal", "Indochine style, blending traditional and modern"],
            planRoomTypePrompts: ["bedroom", "living room", "kitchen", "dining room", "bathroom"],
            planColorizePrompts: ["Colorize the plan in a Semi-realistic style", "Colorize the plan with a black background and white lines, technical drawing style", "Colorize the plan in a Material Base style, clearly showing wood, tile, and concrete materials", "Colorize the plan in a Marker Style, like a hand drawing with markers", "Colorize the plan in a Watercolor Style", "Colorize the plan in a Photorealistic style, with shadows and realistic materials"],
            videoPrompts: [{ display: "Day & Night Time-lapse", value: "Create a time-lapse video of the building from day to night, showing the change of natural and artificial light." }, { display: "Drone circling", value: "A drone shot flying towards the building and circling it once." }, { display: "Passing clouds", value: "A time-lapse video of clouds passing over the building on a sunny day." }, { display: "Light rain scene", value: "Show the building in a light rain shower, with reflections on wet surfaces." }, { display: "Zoom into entrance", value: "A slow zoom shot into the main entrance of the building." }, { display: "Pan across facade", value: "Pan the camera across the building's facade from left to right." }],
            materialChangeOptions: [{ display: "Change floor material", value: "Replace the floor material in image 1 with the new material in image 2, divided into 800x800 tiles" }, { display: "Change carpet material", value: "Replace the carpet material in image 1 with the new patterned carpet in image 2" }, { display: "Change curtains", value: "Replace the curtains in image 1 with the new curtains in image 2" }],
            furnitureChangeOptions: [{ display: "Replace sofa", value: "remove the sofa set in image 1, then add the new sofa set from image 2 in its place, keeping the details of the new sofa exactly as in image 2 without changes" }, { display: "Replace chandelier", value: "remove the chandelier in image 1, then add the new chandelier from image 2 in its place, keeping the details of the new chandelier exactly as in image 2 without changes" }, { display: "Replace coffee table", value: "remove the coffee table in image 1, then add the new coffee table from image 2 in its place, keeping the details of the new coffee table exactly as in image 2 without changes" }, { display: "Replace TV stand", value: "remove the TV stand in image 1, then add the new TV stand from image 2 in its place, keeping the details of the new TV stand exactly as in image 2 without changes" }, { display: "Replace dining table", value: "remove the dining table in image 1, then add the new dining table from image 2 in its place, keeping the details of the new dining table exactly as in image 2 without changes" }, { display: "Replace kitchen cabinets", value: "remove the kitchen cabinets in image 1, then add the new kitchen cabinets from image 2 in its place, keeping the details of the new kitchen cabinets exactly as in image 2 without changes" }],
        },
        engineeredPrompts: {
            applyLighting: `You are a professional lighting and architectural rendering expert. The user has provided an image and wants to completely change its lighting scenario. Your task is to re-render this image with the new lighting conditions described below. **CRITICAL**: You must preserve 100% of the original image's architectural form, materials, and composition. Only change the lighting, shadows, and overall atmosphere of the scene. The desired lighting scenario is: "{0}".`,
            classifyImageTypePrompt: `Is this an image of an interior or exterior space? Answer with only one word: 'interior' or 'exterior'.`,
            generateFromImageInterior: `Act as an expert interior designer and 3D rendering specialist. From the provided interior image, write a detailed prompt under 100 words focusing on these elements:
- The design style of the space.
- Describe in detail, emphasizing the realism of materials (e.g., natural oak wood grain, matte marble surface, slightly textured sofa fabric).
- Describe the lighting: Always use soft, gentle, natural daylight coming through a window, creating a soft feeling with no harsh shadows.
- Camera Angle: Describe a camera angle that matches the source image.
- Prohibitions: Absolutely do not describe any outside context (e.g., city view, garden...).

Important: Only return the content of the prompt, without any introductory phrases or sentences.`,
            generateFromKeywordsInterior: `Act as an expert interior designer and 3D rendering specialist. From the user-provided keywords about an interior space, write a detailed prompt under 100 words focusing on these elements:
- The design style based on the keywords.
- Describe in detail, emphasizing the realism of materials (e.g., natural oak wood grain, matte marble surface, slightly textured sofa fabric).
- Describe the lighting: Always use soft, gentle, natural daylight coming through a window, creating a soft feeling with no harsh shadows.
- Describe a suitable camera angle.
- Prohibitions: Absolutely do not describe any outside context (e.g., city view, garden...).

User's keywords: "{0}"

Important: Only return the content of the prompt, without any introductory phrases or sentences.`,
            generateWithReference: `The user's promt is: "{0}". As an AI architectural renderer, your task is to combine a structural sketch with a style reference. The first image is the structural sketch. The second image is a reference for style, lighting, scenery, and materials. You must apply the mood, lighting, color palette, materials, and surrounding scenery from the second image to the building from the first sketch. It is forbidden to copy the main architectural building shape from the second style-reference image, but you should adopt its overall environment and textures. The final render must be an exterior shot based on the user's promt.`,
            generateWithReferenceNegative: `The user's promt is: "{0}". As an AI architectural renderer, your task is to combine a structural sketch with a style reference. The first image is the structural sketch. The second image is a reference for style, lighting, scenery, and materials. You must apply the mood, lighting, color palette, materials, and surrounding scenery from the second image to the building from the first sketch. It is forbidden to copy the main architectural building shape from the second style-reference image, but you should adopt its overall environment and textures. The final render must be an exterior shot based on the user's promt. CRITICAL: The user has specified things to AVOID. You MUST NOT include any of the following elements in the image: "{1}".`,
            generateWithoutReference: `The user's prompt is: "{0}". You are creating a realistic architectural render. The provided image is a structural sketch. Generate a photorealistic image based on this sketch and the user's prompt.`,
            generateWithoutReferenceNegative: `The user's prompt is: "{0}". You are creating a realistic architectural render. The provided image is a structural sketch. Generate a photorealistic image based on this sketch and the user's prompt. CRITICAL: The user has specified things to AVOID. You MUST NOT include any of the following elements in the image: "{1}".`,
            generateFromImage: `Act as an expert in interior design and architecture with 20 years of experience and a 3D rendering specialist. From the provided 3D/sketch image, write a detailed prompt under 100 words with the following structure, adding cinematic/photographic elements:
- Realistic photo of [type of building], design style, detailed description of materials, material properties of the main object.
- Creatively invent the surrounding scenery and context to be suitable.
- Lighting: Clearly describe the lighting (e.g., Volumetric God Rays, Golden Hour, Low-Key lighting), camera angle (Wide Shot, Low Angle), and Depth of Field.
- Prioritize Vietnamese contexts; choose the scenery and lighting so that the output image's context and lighting most resemble a realistic photo taken in Vietnam.
- Describe the camera angle to match the uploaded image's camera angle.

Example: Realistic architectural photo of a Neoclassical villa. Cream-colored plaster walls, black wrought-iron balcony. Context: A downtown Saigon street, with electrical/cable wires and urban greenery. 10 AM sunlight (harsh, high-intensity) shines directly from above, creating sharp shadows. Wide Shot camera angle, view from below.

Important: Only return the content of the prompt, without any introductory phrases or sentences.`,
            generateFromKeywords: `Act as an expert in interior design and architecture with 20 years of experience and a 3D rendering specialist. From the user-provided keywords, write a detailed prompt under 100 words with the following structure, adding cinematic/photographic elements:
- Realistic photo of [type of building], design style, detailed description of materials, material properties of the main object.
- Creatively invent the surrounding scenery and context based on the keywords.
- Lighting: Clearly describe the lighting (e.g., Volumetric God Rays, Golden Hour, Low-Key lighting), camera angle (Wide Shot, Low Angle), and Depth of Field.
- Prioritize Vietnamese contexts; choose the scenery and lighting so that the output image's context and lighting most resemble a realistic photo taken in Vietnam.
- Describe a suitable camera angle.

User's keywords: "{0}"

Example: If the user enters "neoclassical villa, saigon", you could write: "Realistic architectural photo of a Neoclassical villa. Cream-colored plaster walls, black wrought-iron balcony. Context: A downtown Saigon street, with electrical/cable wires and urban greenery. 10 AM sunlight (harsh, high-intensity) shines directly from above, creating sharp shadows. Wide Shot camera angle, view from below."

Important: Only return the content of the prompt, without any introductory phrases or sentences.`,
            editWithReference: `**CRITICAL INPAINTING DIRECTIVE WITH STYLE REFERENCE**
You are performing a high-fidelity inpainting operation. Adherence to the mask and style reference is the highest priority.

You are given three images in this order:
1.  **Original Image**: The base image to be modified.
2.  **Mask Image**: A black and white image. Your modifications are **STRICTLY AND EXCLUSIVELY** confined to the **WHITE** area.
3.  **Style Reference Image**: An image providing style guidance.

**Your Task**:
1.  **Forbidden Zone**: The **BLACK** area of the mask is a **NO-CHANGE ZONE**. The pixels in this area on the output image **MUST BE IDENTICAL** to the original.
2.  **User's Request**: Within the white-masked area, apply the following change based on the user's promt: "{0}".
3.  **Style Application**: While applying the change, you **MUST** adopt the style, texture, lighting, color palette, and materials from the **Style Reference Image**. Do not copy shapes or objects from the reference, only its aesthetic qualities.
4.  **Final Output**: Produce a single image where the user's request is fulfilled inside the white mask with the specified style, and the black-masked area is a perfect, unaltered copy of the original. The transition must be seamless.`,
            editWithoutReference: `**CRITICAL INPAINTING DIRECTIVE**
Your task is to perform a high-fidelity inpainting operation. Adherence to the mask is the highest priority.

1.  **Primary Rule**: You are given two images: an original image and a mask image. Your modifications are **STRICTLY AND EXCLUSIVELY** confined to the **WHITE** area of the mask image.
2.  **Forbidden Zone**: The **BLACK** area of the mask is a **NO-CHANGE ZONE**. The pixels in this area on the output image **MUST BE IDENTICAL** to the pixels in the same area on the original input image. Any alteration, however minor, in the black-masked region is a failure of the task.
3.  **User's Request**: Within the white-masked area, apply the following change based on the user's promt: "{0}".
4.  **Final Output**: Produce a single image where the user's request is fulfilled inside the white mask, and the black-masked area is a perfect, unaltered copy of the original. The transition must be seamless.`,
            placeAndRenderFurniture: `
**CRITICAL PHOTOREALISTIC COMPOSITION TASK: INTELLIGENT SCALING**

You are a master AI of optical art and photorealistic composition with an expert understanding of 3D perspective and real-world object proportions. Your primary task is to seamlessly and **realistically** integrate one or more objects into a background image.

**Inputs:**
1.  **Background Image**: The main scene.
2.  **Object(s) to Place**: Subsequent images to be placed into the background. These can be any type of object: furniture, architectural structures, people, plants, etc.
3.  **Placement Instructions (JSON)**: A JSON object providing the user's **initial placement guide**. These are suggestions for placement, not strict commands for scale. Realism is more important than adhering to a potentially incorrect user-provided scale.
    - \`pos\`: The \`{x, y}\` coordinates (in %) for the object's **center**. This is a **NON-NEGOTIABLE** target location. The object must be rendered centered at this point, but grounded realistically on the nearest surface (floor, table, wall).
    - \`scale\`: The user's **initial estimate** for the object's width. **This value MUST be overridden if it violates realism.**
    - \`rotation\`: The user's suggested rotation. You should adjust this to match the surface and perspective.
    - \`orientation\`: Flip states.

**Your Task:**
1.  **Analyze the Background in 3D**: Deeply analyze the scene to infer its 3D geometry. Identify perspective lines, vanishing points, light sources, and the scale of known objects (e.g., doors, windows, chairs).
2.  **Place and Render**: Place each object centered on its specified \`pos\` coordinate.
3.  **INTELLIGENT SCALE & PERSPECTIVE CORRECTION (HIGHEST PRIORITY)**:
    - **This is your most critical function.** The user's manual placement might be inaccurate. You **MUST** intelligently correct the scale and perspective of each placed object to make it physically plausible within the scene.
    - **Depth Analysis**: Use the object's 'y' position and the scene's perspective lines to determine its depth (foreground, midground, background).
    - **Automatic Proportional Sizing**: Based on the object's calculated depth, you **MUST** automatically adjust its size to be perfectly proportional to other objects in the scene. **For example, if the user places a decorative lamp that appears too large for the bedroom it's in, you are REQUIRED to shrink it to a realistic, appropriate size.** This correction is mandatory.
    - **Perspective Alignment**: Warp and transform the object so its perspective perfectly matches the vanishing points of the background. It must look like it exists in the 3D space, not just pasted on top.
4.  **Photorealistic Integration**: After correcting the scale and perspective, perform all other integration tasks to the highest standard:
    - **Total Lighting and Material Integration**: Discard the object's original lighting. Re-light it entirely based on the background's light sources, considering its material properties (translucency, reflection, sub-surface scattering).
    - **Shadow Casting**: Cast physically accurate shadows onto the background and other objects. The object must also receive shadows from the scene.
    - **Advanced Edge and Color Harmony**: Perform pixel-perfect edge blending, eliminate color fringing, match atmospheric conditions, and unify the color palette.
5.  **Final Output**: Produce a single, photorealistic composition. **DO NOT** include any text, JSON, or annotations in the output image. Only the final rendered scene is required.

**Placement Data:**
\`\`\`json
{0}
\`\`\`
`,
            generateArchitecturalPrompts: `Act as a professional photographer with over 20 years of experience in architectural, interior, landscape, planning, and resort photography, having won numerous international photography awards.

You are also an expert Prompt Engineer & AI Visual Prompt Designer, with a deep understanding of image description language, visual composition, lighting, space, scale, and emotional impact in leading architectural magazines like ArchDaily, Dezeen, Architectural Digest, Wallpaper, Dwell…

I will upload an image of a building (architecture or interior). Imagine you are actually in that space with a professional camera (Canon R5 or Nikon Z9, tilt-shift lens, and wide-angle/telephoto lens as needed).

Based on your international photography experience and the visual style of contemporary architectural magazines, analyze the uploaded image and propose the 20 most impressive artistic shots of this building.

Each shot should be written as an image generation prompt for AI Nano Banana, specifically describing the camera angle, lighting, weather, composition, lens, and emotional feel of the image. Do not use JSON format.

Clearly divide into 4 groups of shots as follows:

1️⃣ 5 wide shots
• Describe the overall building and surrounding landscape.
• Each shot should have different lighting and weather effects: dawn, noon, sunset, night, rain, or early morning mist.
• Specify the direction of light, camera angle (e.g., from above, eye-level, 45-degree angle, from the entrance…).

2️⃣ 5 medium shots
• Focus on the relationship between space and people. Each shot MUST include a human element (e.g., a person reading, walking, or interacting with the space).
• Describe the composition, depth, lighting perspective, materials, shadows, and contrast.

3️⃣ 5 close-up shots
• Emphasize outstanding details, materials, incident light, reflections, or the subtlety of the design.
• Could be light filtering through curtains, material surfaces, a door handle, wood texture, reflections on water…

4️⃣ 5 artistic shots
• Focus on main subjects such as people, leaves, birds, or vehicles. The focused subject will occupy a large portion of the frame. The main building will be blurred in the background, creating a depth effect (strong foreground-background separation).

Detailed requirements for each shot:
• Write in concise, evocative, and visually strong English.
• Do not use JSON format, only descriptive text.
• Prioritize using emotional, visual, and photographic language (e.g., slanted light, leading lines, blurred foreground, deep background, tilt-shift lens angle, dynamic composition, depth of field, cinematic tone…).
• Goal: to recreate the most authentic emotion, lighting, and photographic art – helping AI Nano Banana generate vivid, deep images with a professional and international magazine-style photographic quality.
Important: Only return the 4 groups of shots as requested. Do not add any introductions, forewords, or conclusions.`,
            generateFromPlan: `From now on, act as an expert interior designer and a prompt writer for image generation AIs (like Midjourney, DALL-E, etc.). You have in-depth skills in layout, form, and architectural plan analysis.

Your task is:

Automatically identify the room type based on the plan I upload (e.g., Living Room, Master Bedroom, Kitchen & Dining).

Analyze the plan to determine the position of the main furniture (bed, sofa, cabinet, dining table, kitchen, etc.) and a standard frontal viewing angle.

Write an image generation prompt (in Vietnamese) following this strict format:

Viewpoint: Always a frontal view (direct), do not describe complex camera angles (e.g., no "view from below").

Content: Describe the position and type of furniture within the frame from the frontal view.

Prohibitions: Absolutely do not describe colors or materials. Do not describe objects outside the main frontal view (e.g., in a bedroom view of the headboard, do not describe the TV stand).

Output Format: Display only the completed prompt, starting with the phrase:

"Tạo phối cảnh nội thất view nhìn chính diện của không gian mặt bằng. Đó là [Your identified room type]. View nhìn trực diện vào... [Detailed description of furniture positions]. Sử dụng hình moodboard làm tham chiếu cho phối cảnh nội thất này. Hãy làm cho nó chân thực như một hình ảnh trực quan kiến trúc với các kết cấu và chi tiết cụ thể."

Do not display the analysis part, only show the Prompt.`,
            generateMoodboard: "Act as a professional interior designer. Based on the provided image and the user's theme: '{0}'. Your task is to create a visually appealing moodboard. The moodboard must include: a color palette extracted from the image, inspirational images that match the theme, texture swatches (like fabric, wood, metal), and relevant keywords. Arrange these elements in a clean, modern layout. The final output must be a single, cohesive image of the moodboard.",
            generateMoodboardWithReference: "As a professional designer, you are given 2 images and a theme. IMAGE 1 is the main inspiration for the **theme and subject matter**. IMAGE 2 is a reference for the **style, color palette, and mood**. The theme is: '{0}'. Your task is to create a visually appealing moodboard that combines both elements. The moodboard must include: a color palette extracted from the **style reference image**, inspirational images that match the **theme from the main image**, texture swatches (fabric, wood, metal), and relevant keywords. Arrange these elements in a clean, modern layout. The final output must be a single, cohesive image of the moodboard."
        }
    }
};