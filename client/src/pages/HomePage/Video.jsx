import React from 'react';

function Video() {
  return (
    <>
      <script type="text/javascript" src="https://videosuite-player-wrapper.vercel.app/assets" async></script>

      <div className="iv-player_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }} data-hash="6570dd3125e25">
        <div className="iv-player_responsive_wrapper" style={{ height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' }}>
          <div className="iv-player_embed iv-player_async_p2z7746nud videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
            <div className="iv-player_swatch" style={{ height: '100%', left: '0', opacity: '0', overflow: 'hidden', position: 'absolute', top: '0', width: '100%' }}>
              <img src="https://i-fast.b-cdn.net/live/21872_65708a4a7ee21.png" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
