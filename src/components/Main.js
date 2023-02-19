import styled from "styled-components";
import { useState } from "react";
import { getUserAuth } from "../store/user";
import { useSelector } from "react-redux";
import PostModal from "./PostModal";
import { useEffect } from "react";
import { onSnapshot, updateDoc ,doc ,deleteDoc } from "firebase/firestore";
import ReactPlayer from "react-player";
import { postsQuery, postsRef } from "../firebase";
import Comment from "./Comment";
const Main=(props)=>{
      const user= useSelector(getUserAuth());
      const [isPostVisible,setPostVisible]=useState(false);

      const [posts,setpost]=useState([]);
      
      const [showComment,setShowComment]=useState([]);
      const [editpost,setEditpost]=useState(false);
      
      

      useEffect(()=>{
            const unsubscribe=onSnapshot(postsQuery,(snapshot)=>{
                  let arr=[];
                  snapshot.docs.map((doc)=>
                        arr.push({...doc.data(),postID: doc.id})
                        );
                  setpost(arr);
            });

            return () =>{
                  unsubscribe();
            };
      },[]);

      const fetchlikes=(likes,postid)=>{
            updateDoc(doc(postsRef,postid),{
                  likes: likes.some((l)=>l.email === user.email)
                  ? likes.filter((l)=>l.email !== user.email)
                  : [
                      { name: user.displayName , email: user.email, photo: user.photoURL},
                      ...likes,
                  ],
            })
      }
      
      const setComments=(postid)=>{            
            setShowComment((prev)=> [postid,...prev]);
      }
      
      
      const deletepost=(postid)=>{
            deleteDoc(doc(postsRef,postid));
      }

      // console.log(posts)
    return (
           <Container>
           <ShareBox>
           <div>
            <img src={user?.photoURL || "/images/User.png"} alt="" />
            <button onClick={()=>setPostVisible(true)}>Start a post</button>
           </div>

           <div>
             <button onClick={()=>setPostVisible(true)}>
                  <img src="/images/photo-icon.svg" alt="" />
                  <span>Photo</span>
             </button>

             <button onClick={()=>setPostVisible(true)}>
                  <img src="/images/event-icon.svg" alt=""/>
                  <span>Video</span>
             </button>

             <button onClick={()=>setPostVisible(true)}>
                  <img src="/images/video-icon.svg" alt=""/>
                  <span>Event</span>
             </button>

             <button onClick={()=>setPostVisible(true)}>
                  <img src="/images/article-icon.svg" alt=""/>
                  <span>Write article</span>
             </button>
           </div>
           </ShareBox>
           <div>
            {   posts.map((post)=>(
                  <Article>
                  <SharedActor>
                        <a>
                              <img src={post.avatarURL || "/images/user.svg" } alt={post.author || "user"}/>
                              <div>
                              <span>{post.author}</span>
                              <span>{post.info}</span>
                              <span>{post.date}</span>
                              </div>
                        </a>
                        <button onClick={()=>setEditpost((prev)=>(prev===post.postID) ? false: post.postID)}>
                         <img src="../images/ellipses.svg" alt="" />
                        </button>

                        { editpost === post.postID && (
                        
                  <EditModel>
                              <li>
                                    <img src="../images/firebase.png" alt="saved"/>
                                    <div className="info">
                                    <h6>Save</h6>
                                    <span>Save for later</span>
                                    </div>
                              </li>
                              { post.email === user.email && (
                              <li onClick={()=>{deletepost(post.postID)}}>
                                    <img src="../images/delete.svg" alt=""/>
                                    <h6>Delete post</h6>
                              </li>
                              )}
                        </EditModel>
                       )}
                  </SharedActor>
                  <Description>
                        {post.description}
                  </Description>
                  { post.media.imageURL && (
                  <SharedImg>
                        <a>
                              <img src={post.media.imageURL} alt={post.author || "user"}/>
                        </a>
                  </SharedImg>)
                  }

               {post.media.videoURL && (
                 <SharedVideo>
                  <ReactPlayer width="100%" url={post.media.videoURL} />
                 </SharedVideo>
                 )}
                  <SocialCounts>
                        <li>
                              <button>
                                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                                    <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt=""/>
                                    <span>{post.likes.length}</span>
                              </button>
                        </li>
                        <span>⬤</span>
                        <li onClick={()=>showComment.includes(post.postID) ? setShowComment(showComment.filter((id)=>id!==post.postID)):setComments(post.postID)}>
                              <a>{post.comments ? post.comments.length : 0} Comments</a>
                        </li>
                        
                  </SocialCounts>

                  <SocialActions>
                                    <button 
                                    className={
                                          post.likes.some((l)=> l.email === user.email) ? "active":""
                                    }
                                    onClick={()=>{
                                          fetchlikes(post.likes,post.postID);
                                    }}>
                                    <img className="unLiked" src="../images/like.svg" alt="like" />
                                    <img
                                    className="liked"
                                    src="https://static-exp1.licdn.com/sc/h/5zhd32fqi5pxwzsz78iui643e"
                                    alt="like"
                                    />
                                    <span>Like</span>
                                    </button>
                                    <button onClick={()=>showComment.includes(post.postID) ? setShowComment(showComment.filter((id)=>id!==post.postID)):setComments(post.postID)}>
                                        <i className="far fa-comment"></i>
                                        <span>Comment</span>
                                    </button>
                                    <button>
                                        <i className="fas fa-share"></i>
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <i className="fab fa-telegram-plane"></i>
                                        <span>Send</span>
                                    </button>
                  </SocialActions>
                  {showComment.includes(post.postID) && (<Comment photo={user.photoURL} comments={post.comments} postID={post.postID} user={user}/>)}

            </Article>
            ))}
           </div>
           {isPostVisible && <PostModal onExit={()=>setPostVisible(false)}/>}
    </Container>
    );
}

const Container=styled.div`
     grid-area: main;
`;

const CommonCard=styled.div`
      text-align: center;
      overflow: hidden;
      margin-bottom: 8px;
      background-color: #fff;
      border-radius: 5px;
      position: none;
      box-shadow: 0 0 0 1px rgb(0 0 0 / 15%),0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox=styled(CommonCard)`
      display: flex;
      flex-direction: column;
      color: #958b7b;
      margin: 0 0 8px 0;
      background: white;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 17px;

      div{
            button{
                  outline: none;
                  /* padding: 15px; */
                  color: rgba(0,0,0,0.6);
                  font-size: 14px;
                  line-height: 1.5;
                  min-height: 48px;
                  background: transparent;
                  border: none;
                  display: flex;
                  align-items: center;
                  font-weight: 600;
            }
            &:first-child{
                  display: flex;
                  align-items: center;
                  padding: 8px 16px 0 px 16px;
                  img{
                       width: 48px;
                       border-radius: 50%;
                       margin-right: 8px;
                  }
                  button{
                        margin: 4px 0;
                        flex-grow: 1;
                        border-radius: 35px;
                        padding-left: 16px;
                        border: 1px solid rgba(0,0,0,0.15);
                        border-radius: 35px;
                        background-color: white;
                        text-align: left;
                  }
            }
            &:nth-child(2){
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              padding-bottom: 4px;

              button{
                  img{
                        margin: 0 4px 0 -2px;
                  }
                  span{
                        color: #70b5f9;
                  }
              }
            }
      }
`;
const Article=styled(CommonCard)`
      padding: 0;
      margin: 0 0 8px;
      overflow: visible;      
`;

const SharedActor=styled.div`
      padding-right: 40px;
      flex-wrap: nowrap;
      padding: 12px 16px 0;
      margin-bottom: 8px;
      align-items: center;
      display: flex;
      position: relative;

      a{
            margin-right: 12px;
            flex-grow: 1;
            overflow: hidden;
            display: flex;
            text-decoration: none;

            img{
                width: 48px;
                height: 48px;
                border-radius: 20px;
            }
            &>div{
                  display: flex;
                  flex-direction: column;
                  flex-grow: 1;
                  flex-basis: 0;
                  margin-left: 8px;
                  overflow: hidden;

                  span{
                        text-align: left;
                        &:first-child{
                              font-size: 14px;
                              font-weight: 700;
                              color: rgba(0,0,0,1);
                        }
                        &:nth-child(n+1){
                              font-size: 12px;
                              color: rgba(0,0,0,0.6);
                        }
                  }
            }
      }

      button{
            background: transparent;
            border: none;
            outline: none; 
            img{
            width: 1.5rem;
            height: fit-content;
          }
      } 
`;

const Description=styled.div`
     padding: 0 16px;
     overflow: hidden;
     color: rgba(0,0,0,0.9);
     font-size: 14px;
     text-align: left;
`;
const SharedImg=styled.div`
      margin-top: 8px;
      width: 100%;
      display: block;
      position: relative;
      background-color: #f9fafb;
      img{
            object-fit: contain;
            width: 100%;
            height: 100%;
      }
`;

const SocialCounts=styled.ul`
       line-height: 100%;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    list-style: none;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;

    li {
        margin-right: 5px;
        font-size: 12px;

        button {
            display: flex;
            border: none;
            background: #fff;

            span{
                  padding-left: 5px;
            }
        }
    }

    img {
        width: 18px;
    }
    & > span {
    font-size: 8px;
    margin: 0 8px;
  }
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;

    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        cursor: pointer;
        background-color: #fff;
        .liked {
         display: none;
         }
        .unLiked {
          display: inline-block;
         }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &.active {
      color: #0a66c2;
      .liked {
        display: inline-block;
      }
      .unLiked {
        display: none;
      }
    }
        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
`;

const SharedVideo = styled.div`
  background-color: #f9fafb;
  display: block;
  margin-top: 8px;
  position: relative;
  width: 100%;

  iframe {
    width: 100%;
  }
`;

const EditModel=styled.ul`
   animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 55px;
   
   background-color: white;
   box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
   border-radius: 8px;
   overflow: hidden;
   z-index: 99;
   width: 30%;


    li{
      display: flex;
      gap: 8px;
      padding: 10px;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover{
            background-color: rgba(0,0,0,0.08);
      }

      img{
            width: 18px;
            height: 20px;
      }
      h6{
            font-size: 14px;
            color: rgba(0,0,0,1);
            font-weight: 600;
      }

      .info {
      text-align: start;
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    }     
`;




export default Main;