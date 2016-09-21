<div class="wrapper">
	<!-- Header start -->
	<header>
		<menu>
    <? if ($currentPage == 'home') { ?> 
			<!--a class="menu-first-link <? if ($currentPage == 'home') { echo 'selected';} ?>" href="/index.html" title="HOME">HOME
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a-->
    <? } else { ?> 
        <!--a class="logo-small" href="/">
           <span><img src="/img/logo.png" alt="IXLeeds" /></span>
				<span class="link-arrow-right"></span>
        </a-->
    <? } ?> 
<!--        <a class="logo-small" href="/">
           <span><img src="/img/logo.png" alt="IXLeeds" /></span>
				<span class="link-arrow-right"></span>
        </a>-->
			<a class="menu-first-link <? if ($currentPage == 'home') { echo 'selected';} ?>" href="/index.html" title="HOME">HOME
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<a <? if ($currentPage == 'about') { echo 'class="selected"';} ?> href="/content/about.html" title="ABOUT">ABOUT
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<a <? if ($currentPage == 'join') { echo 'class="selected"';} ?> href="/content/join.html" title="JOIN">JOIN
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<a <? if ($currentPage == 'members') { echo 'class="selected"';} ?> href="/content/members.html" title="MEMBERS">MEMBERS
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<a <? if ($currentPage == 'events') { echo 'class="selected"';} ?> href="/event/index.html" title="EVENTS">EVENTS
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<a  class="<? if ($currentPage == 'outreach') { echo 'selected';} ?> menu-last-link" href="/content/outreach.html" title="OUTREACH">OUTREACH
				<span class="link-arrow-left"></span>
				<span class="link-arrow-right"></span>
			</a>
			<span class="menu-last-item"></span>
		</menu>
		<? if ($currentPage == 'home') { ?> 
		<div class="logo-block">
			<a class="logo" href="/">
			   <span class="logo-i"></span> 
			   <span class="logo-arrow-top"></span> 
			   <span class="logo-arrow-bottom"></span> 
			   <span class="logo-leeds"></span> 
			</a>
		</div>
		<? } ?> 
	</header>
	<!-- Header end -->
	
