export type Post = {
  no: string;
  cat: string;
  title: string;
  date: string;
  read: number;
  seed: string;
  author: string;
  dek: string;
  quote: string;
  body: string[];
};

export const posts: Post[] = [
  {
    no: "12",
    cat: "Xã hội",
    title: "Mạng xã hội đã giết chết sự chờ đợi",
    date: "12.06",
    read: 8,
    seed: "tap-chodon",
    author: "ha",
    dek: "Khi mọi thứ đều tức thời, chúng ta đánh mất cả nghi thức lẫn phần thưởng của sự chờ đợi.",
    quote:
      "Chờ đợi từng là một nghi thức. Bây giờ nó chỉ là một lỗi của hệ thống cần được sửa ngay.",
    body: [
      "Có một thời gian, một lá thư mất bảy ngày để đi từ Sài Gòn ra Hà Nội. Bảy ngày đó không phải là độ trễ của hệ thống — đó là một phần của lá thư. Người viết chọn từng từ với biết bao cẩn thận, người nhận đọc đi đọc lại đến nỗi giấy mòn ở góc phần tư. Sự chờ đợi, ngày ấy, là một nghi thức.",
      "Hôm nay, ba giây tải chậm đã là lý do để đóng tab. Chúng ta được nuôi bằng sự tức thời đến mức tay với lấy điện thoại trước khi não kịp hỏi vì sao nó rung. Chúng ta không còn chờ tin — ta xé từng mẩu tin nhỏ như xé vỏ quà, và chẳng còn gì để bóc.",
      "Tôi không kêu gọi ai xóa ứng dụng. Chỉ thử, trong một chiều nào đó, hẹn ai đó một lá thư thật. Viết tay, dán tem, bỏ hòm. Rồi đợi. Cái thứ ngứa ngáy lúc đầu chính là thời gian đang trở lại với bạn.",
    ],
  },
  {
    no: "11",
    cat: "Tùy bút",
    title: "Cách chúng ta học lại sự im lặng giữa thành phố ồn ào",
    date: "05.06",
    read: 6,
    seed: "tap-imlang",
    author: "ann",
    dek: "Giữa một thành phố chưa từng ngừng nói, học cách im lặng là một kỹ năng sống còn.",
    quote:
      "Im lặng không phải là không có tiếng. Im lặng là khi bạn thôi phải phản ứng với mọi thứ.",
    body: [
      "Hà Nội lúc năm giờ sáng có một loại im lặng mà không tai nào nghe được — cái im của những con phố chưa thở. Tôi biết điều đó nhờ một mùa ốm, khi bác sĩ bắt đi ngủ sớm và mọi thứ hay ho khác đều đã đóng cửa.",
      "Chúng ta sợ im lặng đến mức biến nó thành bài toán: tiếng ồn trắng, app thiền, playlist âm thanh rừng nhiệt đới. Nhưng im lặng thật sự không nằm trong tai nghe. Nó là khoảnh khắc bạn ngồi giữa quán cà phê đông người mà không cầm điện thoại, để những câu chuyện lạ tai bay qua như gió.",
      "Kể từ mùa ấy, tôi dành mười phút mỗi sáng chỉ để ngồi. Không đọc, không nghe, không suy tính gì cả. Mười phút nghe qua thì phí, nhưng đó là mười phút duy nhất trong ngày tôi thật sự là chủ nhân của chính mình.",
    ],
  },
  {
    no: "10",
    cat: "Sách",
    title: 'Đọc lại "Nhật ký Đặng Thùy Trâm" sau mười năm',
    date: "29.05",
    read: 11,
    seed: "tap-nhatky",
    author: "khoa",
    dek: "Cùng một trang giấy, hai con người khác nhau — và một cuộc đối thoại kéo dài mười năm.",
    quote:
      "Một quyển sách không đổi, nhưng người đọc thì đã đi qua bao nhiêu cuộc chiến của riêng mình.",
    body: [
      "Mười hai tuổi, tôi đọc Nhật ký Đặng Thùy Trâm như đọc một câu chuyện về người khác. Hai mươi hai tuổi, tôi đọc lại và nhận ra mình đang đọc về chính câu hỏi của tuổi trẻ: làm sao để sống một đời không phí một ngày nào?",
      "Điều khiến trang nhật ký này sống qua nửa thế kỷ không phải là bối cảnh chiến tranh, mà là sự nghiêm túc tuyệt đối trong từng câu viết. Bác sĩ trẻ ấy không viết cho ai đọc — và chính vì thế, mỗi chữ đều nặng ký như lời thề.",
      "Mười năm nữa, tôi sẽ đọc lại lần thứ ba. Có lẽ lúc ấy tôi sẽ hiểu thêm một tầng nữa: rằng tuổi trẻ không nằm ở số năm đã sống, mà nằm ở việc bạn dám tin vào một điều gì đó đủ sâu để viết ra.",
    ],
  },
  {
    no: "09",
    cat: "Đời thường",
    title: "Kiến trúc của quán cà phê Hà Nội những năm chín mươi",
    date: "22.05",
    read: 7,
    seed: "tap-caphesua",
    author: "ann",
    dek: "Không có concept, không có playlist — chỉ có ghế thấp, quạt trần và những người ở lại.",
    quote:
      "Quán cà phê xưa không bán không gian. Nó chỉ giữ cho bạn một chỗ ngồi giữa phố.",
    body: [
      'Một quán cà phê những năm chín mươi ở Hà Nội không có "concept". Ghế thấp, bàn thấp, mặt tiền mở toang ra vỉa hè — kiến trúc của nó là kiến trúc của sự ở lại: người ta đến không phải để check in, mà để ngồi, lúc hai tiếng, lúc cả buổi.',
      "Tường vàng xỉn, quạt trần kêu cót két, tồn ong vờn quanh cái xy-lanh đèn móp méo — nhìn vào bản thiết kế hiện đại nào cũng phải gọi là thất bại. Nhưng chính những bất tiện đó dạy người ta cách ngồi yên. Ghế không êm thì người ta trò chuyện nhiều hơn.",
      'Rồi quán cà phê có chủ đề đến, specialty coffee đến, và phin lọc trở thành một "trải nghiệm" có chủ đích. Tôi không phản đối. Chỉ là có những chiều, tôi nhớ nhất cái quạt trần kêu cót két ấy — thứ âm thanh mà không playlist nào giả nổi.',
    ],
  },
  {
    no: "08",
    cat: "Tùy bút",
    title: "Tại sao tôi vẫn viết bằng bút chì",
    date: "15.05",
    read: 5,
    seed: "tap-butchi",
    author: "khoa",
    dek: "Công cụ chậm nhất lại dạy tôi nghĩ kỹ hơn mọi ứng dụng ghi chú.",
    quote: "Gõ là ghi lại. Viết chì là bận tâm.",
    body: [
      "Máy gõ nhanh hơn, xóa sạch hơn, lưu vĩnh viễn hơn. Vậy mà mỗi sáng, tôi vẫn lấy cây bút chì 2B — không phải vì hoài cổ, mà vì bút chì là công cụ duy nhất khiến tôi phải viết chậm đủ để nghĩ.",
      "Bút chì để lại dấu vết của sự do dự: những nét mờ bị bỏ, những chữ đè lên nhau, chỗ gôm chà nham nhở. Một trang giấy như thế trung thực hơn mọi bản thảo điện tử sạch bong — nó kể cho bạn nghe tư duy của bạn lụi hụi ra sao.",
      "Và còn một lý do nhỏ nữa: chữ chì mờ dần theo năm tháng. Câu nào đáng nhớ, tôi phải chép lại. Đó là cách lọc tốt nhất mà không phần mềm nào học được.",
    ],
  },
  {
    no: "07",
    cat: "Đời thường",
    title: "Ghi chú về việc bắt đầu một thói quen buổi sáng",
    date: "08.05",
    read: 4,
    seed: "tap-buoisang",
    author: "ann",
    dek: "Thói quen không chết vì lười — nó chết vì tham. Mùa xuân năm nay, tôi đổi cách chơi.",
    quote:
      "Một thói quen nhỏ đến mức không thể thất bại thì sẽ không bao giờ bị bỏ.",
    body: [
      "Mỗi đầu năm tôi hẹn mình dậy lúc năm rưỡi, thiền, tập thể dục và viết ba trang nhật ký. Mười tháng sau, tôi dậy lúc bảy mười lăm và vừa đánh răng vừa lướt tin tức. Kinh nghiệm nhiều năm rút ra: thói quen không chết vì lười — nó chết vì tham.",
      "Năm nay tôi đổi cách chơi: chỉ một việc, dưới hai phút, ngay sau khi đánh răng — pha một ly nước chanh, vậy thôi. Nghe thì nực cười, nhưng sau hai trăm ngày, ly nước chanh ấy đã kéo theo cả một buổi sáng có trật tự, như hạt giống không cần ai kể lể vẫn mọc rễ.",
      "Nếu bạn đang định bắt đầu một điều gì, hãy bắt đầu từ mức mà bạn thấy hơi ngại vì nó quá dễ. Sự dễ ấy chính là bảo hiểm cho những ngày bạn tồi tệ nhất — mà ngày tồi tệ, thì nào ai chưa từng có.",
    ],
  },
  {
    no: "06",
    cat: "Sách",
    title: "Về nghệ thuật bỏ dở một cuốn sách",
    date: "01.05",
    read: 6,
    seed: "tap-bodero",
    author: "khoa",
    dek: "Quyền được bỏ dở chính là thứ khiến người ta đọc nhiều hơn, chứ không phải ít đi.",
    quote:
      "Đọc hết mọi cuốn đến cùng không phải là đức kiên trì. Đó là cách lãng phí thời gian đọc tinh vi nhất.",
    body: [
      "Có một nỗi tội lỗi lạ lùng của người đọc: dở một cuốn sách ra mà không đọc tiếp, như thể bỏ bữa. Tôi từng cưỡng mình đọc hết một quyển tiểu thuyết dày trong hai tháng, và phần thưởng là nửa năm sau tôi không động đến quyển nào.",
      "Sau ấy tôi học được một điều từ ông giáo già hay ngồi quán nước: sách cũng như bạn bè, có người hợp chuyện trò cả đêm, có người chỉ nên bắt tay rồi đi. Cuốn sách không hợp lúc này có thể hợp lúc khác — hoặc không bao giờ, và điều đó chẳng có lỗi ở ta, cũng chẳng có lỗi ở nó.",
      "Vậy nên giờ tôi cho phép mình bỏ sách ở trang năm mươi mà không day dứt. Cuộc đời ngắn, tủ sách dài, và quyền được bỏ dở — tin hay không — chính là thứ khiến người ta đọc nhiều hơn, chứ không phải ít đi.",
    ],
  },
];

export const CATS = ["Tất cả", "Tùy bút", "Sách", "Đời thường", "Xã hội"];

export const TOPIC_META: Record<string, string> = {
  "Tùy bút": "Những suy tư ngắn, viết trong lúc chờ pha cà phê.",
  Sách: "Đọc gì, đọc thế nào, và vì sao đọc lại.",
  "Đời thường": "Quán quen, con hẻm, thói quen buổi sáng, bữa cơm nhà.",
  "Xã hội": "Những câu hỏi của thời đại — đặt ra bằng cái giọng bình thản.",
};

export function getPostByNo(no: string): Post | undefined {
  return posts.find((p) => p.no === no);
}

export function getPostsByAuthor(authorId: string): Post[] {
  return posts.filter((p) => p.author === authorId);
}

export function getPostsByCategory(cat: string): Post[] {
  if (cat === "Tất cả") return posts;
  return posts.filter((p) => p.cat === cat);
}

export function getRelatedPosts(current: Post, count = 2): Post[] {
  const same = posts.filter(
    (x) => x.no !== current.no && x.cat === current.cat,
  );
  const others = posts.filter(
    (x) => x.no !== current.no && x.cat !== current.cat,
  );
  return [...same, ...others].slice(0, count);
}
