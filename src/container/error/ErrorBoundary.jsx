import React from "react";
import { StaticImage } from "gatsby-plugin-image";

class ErrorBoundary extends React.Component {
  
          constructor(props) {
            super(props);
            this.state = { hasError: false };
          }
        
          static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
          }
        
          render() {
            if (this.state.hasError) {
              // You can render any custom fallback UI
              return (
                    <section className="register-section">
                    <div className="container">
                        <div className="grid gap-10 md:gap-16 lg:gap-24 grid-cols-1 md:grid-cols-2 items-center">
                            <div className="image">
                                <StaticImage
                                    className="align-middle ml-3"
                                    src="../../data/images/others/login-thumb.png"
                                    alt=""
                                />
                            </div>
                            <div className="form-warp">
                                <h4>We're down right now, please try again later</h4>
                            </div>
                        </div>
                    </div>
                </section>
              );
            }
        
            return this.props.children; 
          }
        }
export default ErrorBoundary;
