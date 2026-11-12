declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    FORMSPREE_ENDPOINT?: string;
  }
}
