use axum::{
    routing::{get, },
    Router,
};
use tower_http::services::ServeDir;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    //serve static files from the "static" folder
    let static_files = ServeDir::new("static");

    //create routes
    let app = Router::new()
        .nest_service("/", static_files)
        .route("/greetings", get(|| async { "greetings from rust back."}));

    //server address
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Running at http://{}/", addr);

    //start the server

    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}