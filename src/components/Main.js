import styled from "styled-components";
import { useState } from "react";
import { getUserAuth } from "../store/user";
import { useSelector } from "react-redux";
import PostModal from "./PostModal";
const Main=(props)=>{
      const user= useSelector(getUserAuth());
      const [isPostVisible,setPostVisible]=useState(false);
      const random= 8;
      const [con,setcon]=useState(false);
      const rand=5;
    return (
           <Container>
           <ShareBox>
           <div>
            <img src={user?.photoURL || "/images/User.png"} alt="" />
            <button onClick={()=>setPostVisible(true)}>Start a post</button>
           </div>

           <div>
             <button>
                  <img src="/images/photo-icon.svg" alt=""/>
                  <span>Photo</span>
             </button>

             <button>
                  <img src="/images/event-icon.svg" alt=""/>
                  <span>Video</span>
             </button>

             <button>
                  <img src="/images/video-icon.svg" alt=""/>
                  <span>Event</span>
             </button>

             <button>
                  <img src="/images/article-icon.svg" alt=""/>
                  <span>Write article</span>
             </button>
           </div>
           </ShareBox>
           <div>
            <Article>
                  <SharedActor>
                        <a>
                              <img src="/images/user.svg" alt=""/>
                              <div>
                                    <span>Title</span>
                                    <span>Info</span>
                                    <span>Date</span>
                              </div>
                        </a>
                        <button>
                              <img src="images/ellipsis.png" alt=""/>
                        </button>
                  </SharedActor>
                  <Description>
                        Description
                  </Description>
                  <SharedImg>
                        <a>
                              <img src="/images/code.png" alt=""/>
                        </a>
                  </SharedImg>
                  <SocialCounts>
                        <li>
                              <button>
                                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                                    <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt=""/>
                                    <span>{con?rand+1:rand}</span>
                              </button>
                        </li>
                        <span>⬤</span>
                        <li>
                              <a>{random} Comments</a>
                        </li>
                  </SocialCounts>

                  <SocialActions>
                                    <button onClick={()=>setcon(!con)} style={{backgroundColor:con?"rgba(0,0,0,0.09)":"white"}}>
                                    <i className="far fa-thumbs-up"></i>
                                        <span>Like</span>
                                    </button>
                                    <button>
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
            </Article>
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

      a{
            margin-right: 12px;
            flex-grow: 1;
            overflow: hidden;
            display: flex;
            text-decoration: none;

            img{
                width: 48px;
                height: 48px;
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
            position: absolute;
            right: 12px;
            top: 0;
            background: transparent;
            border: none;
            outline: none;
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
        background-color: #fff;

        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
`;
export default Main;