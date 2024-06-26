
#写入
#curl -X 'POST' \
#  'http://localhost:8000/blog/' \
#  -H 'accept: application/json' \
#  -H 'Content-Type: application/json' \
#  -d '{"title":"博客2","content":"# 我的旅行日记\n\n## 日记一：巴黎之行\n\n### Day 1: 抵达巴黎\n\n今天终于抵达了巴黎！一路上风景美不胜收，尤其是到达埃菲尔铁塔时，被它的壮丽景象深深震撼。晚上，我在塞纳河畔散步，感受到了巴黎的浪漫气息。\n\n### Day 2: 参观卢浮宫\n\n今天我前往了卢浮宫，这座艺术殿堂真是令人叹为观止！在这里我欣赏到了许多世界知名的艺术品，如《蒙娜丽莎》和《维纳斯的诞生》等。卢浮宫的壮丽建筑和丰富的收藏让我流连忘返。\n\n### Day 3: 蒙马特山之行\n\n今天我来到了蒙马特山，登上了山顶的圣心大教堂，俯瞰整个巴黎城市，景色壮观。下山后，我在蒙马特艺术家村漫步，欣赏着街头艺术家的作品，感受到了浓厚的艺术氛围。\n\n## 日记二：东京之行\n\n### Day 1: 到达东京\n\n我来到了东京，这座充满活力和魅力的城市！第一天我先去了浅草寺，参观了它庄严肃穆的建筑和热闹的庙会。晚上，我在东京塔上欣赏了夜景，美不胜收。\n\n### Day 2: 游览秋叶原\n\n今天我来到了秋叶原，这里是科技和动漫的天堂！我逛了很多电器商店和动漫书店，购买了许多有趣的商品。晚上，我还参加了一场动漫展览，感受到了日本文化的魅力。\n\n### Day 3: 体验传统文化\n\n今天我体验了一些日本的传统文化，如茶道和和服体验。我参加了一场传统茶道表演，学习了如何泡茶和品茶。然后我穿上和服，拍了一些美丽的照片。这是一次难忘的体验！\n\n## 结语\n\n这次旅行让我收获良多，我不仅欣赏到了世界各地的风景和文化，还结交了许多新朋友。我相信这些美好的回忆会伴随着我一生。\n\n感谢阅读我的旅行日记！"}'


## 读取
curl -X 'GET' \
  'http://47.120.78.107:8000/blogs/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json'

## 删除
#curl -X 'DELETE' \
#  'http://localhost:8000/blog/1' \
#  -H 'accept: application/json' \
#  -H 'Content-Type: application/json'