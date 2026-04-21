import asyncio
import os
from playwright.async_api import async_playwright

HTML = "/sessions/sharp-eloquent-planck/mnt/UTokyo ITASIA302: Introduction to Digital Technology and Society/AI_Society_Research_Trends.html"
OUT = "/sessions/sharp-eloquent-planck"

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900},
                                        device_scale_factor=1.5)
        page = await ctx.new_page()

        console_msgs = []
        page_errors = []
        page.on("console", lambda m: console_msgs.append(f"[{m.type}] {m.text}"))
        page.on("pageerror", lambda e: page_errors.append(str(e)))

        await page.goto("file://" + HTML, wait_until="networkidle")
        # Let fonts and animations kick in
        await page.wait_for_timeout(2500)

        # Capture each scene by scrolling
        scenes = [
            ("hero",   "#scene-0"),
            ("vol",    "#scene-1"),
            ("genai",  "#scene-2"),
            ("traj",   "#scene-3"),
            ("snap",   "#scene-4"),
            ("close",  "#scene-5"),
            ("appendix", "#scene-6"),
        ]
        for name, sel in scenes:
            await page.evaluate(f"document.querySelector('{sel}').scrollIntoView({{behavior:'instant',block:'start'}})")
            # pause for reveal animations
            await page.wait_for_timeout(2600)
            await page.screenshot(path=os.path.join(OUT, f"shot_{name}.png"),
                                  clip={"x":0,"y":0,"width":1440,"height":900})

        # full page screenshot (may be very tall)
        await page.screenshot(path=os.path.join(OUT, "shot_full.png"), full_page=True)

        print("CONSOLE:")
        for m in console_msgs: print(" ", m)
        print("ERRORS:")
        for e in page_errors: print(" ", e)
        if not page_errors:
            print(" (none)")

        await browser.close()

asyncio.run(run())
