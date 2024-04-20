from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from pydantic import BaseModel


# 定义数据库模型
Base = declarative_base()

class Blog(Base):
    __tablename__ = 'blogs'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    create_time = Column(Integer, default=0)  # 设置默认值为当前时间
    content = Column(Text)

class BlogView(BaseModel):
    id: int = 0
    title: str = ""
    create_time: int = int(datetime.now().timestamp())
    content: str = ""

class LoginInput(BaseModel):
    account: str = ""
    password: str = ""



# 初始化 FastAPI 应用
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源的跨域请求
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # 允许的HTTP方法
    allow_headers=["*"],  # 允许所有请求头
)

# 数据库配置（请根据你的实际情况修改）
SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://root:XWPWXL6266Alita%@localhost:3306/blog'
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)

# 创建所有表
Base.metadata.create_all(bind=engine)

# 获取所有博客
@app.get("/blogs/", response_model=list[BlogView])
def get_blogs():
    db = SessionLocal()
    blogs = db.query(Blog).all()
    db.close()
    res = []
    for blog in blogs:
        blog_dict = blog.__dict__
        res.append(BlogView(**blog_dict))
    return res


# 获取某个具体的某刻
@app.get("/blog/{blog_id}", response_model=BlogView)
def get_blog(blog_id: int):
    db = SessionLocal()
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    db.close()
    blog_dict = blog.__dict__
    return BlogView(**blog_dict)

# 新增博客
@app.post("/blog/")
def create_blog(blog_view: BlogView):
    db = SessionLocal()
    db.add(Blog(**blog_view.dict()))
    db.commit()
    return {"message": "Blog created successfully"}

# 删除博客
@app.delete("/blog/{blog_id}", response_model=dict)
def delete_blog(blog_id: int):
    db = SessionLocal()
    blog_to_delete = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog_to_delete:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog_to_delete)
    db.commit()
    return {"message": "Blog deleted successfully"}

@app.put("/blog/{blog_id}")
def update_blog(blog_id: int, update_blog: BlogView):
    # 检查博客是否存在
    db = SessionLocal()
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    # 更新博客信息
    blog.title = update_blog.title
    blog.content = update_blog.content
    db.commit()
    return {"message": "Blog updated successfully", "blog_id": blog_id}

@app.post("/login")
def login(login_input: LoginInput):
    print(login_input)
    if login_input.account == "xiaolei" and login_input.password == "xiaolei123":
        return {
            "message": "success",
        }
    else:
        return {
            "message": "wrong password!"
        }



# 运行服务器
if __name__ == "__main__":
    import uvicorn
    # 添加CORS中间件
    uvicorn.run(app, host="0.0.0.0", port=8000)
