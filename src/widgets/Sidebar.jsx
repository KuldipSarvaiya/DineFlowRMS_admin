import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../AppState";

export default function Sidebar() {
  const { appData } = useContext(context);
  const role = appData?.auth?.role_id;
  return (
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        {/* home */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/">
            <i class="bi bi-house"></i>
            <span>Home</span>
          </Link>
        </li>

        {/* menu */}
        {role <= 2 && (
          <li class="nav-item">
            <Link class="nav-link collapsed" to="/menu">
              <i class="bi bi-bag"></i>
              <span>Menu</span>
            </Link>
          </li>
        )}

        {/* bills */}
        {role <= 2 && (
          <li class="nav-item">
            <Link class="nav-link collapsed" to="/bills">
              <i class="bi bi-coin"></i>
              <span>Bills</span>
            </Link>
          </li>
        )}

        {/* users */}
        {role < 4 && (
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-person"></i>
              <span>Users</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="components-nav"
              class="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              {role <= 2 && (
                <>
                  <li>
                    <a href="/users_managers">
                      <i class="bi bi-circle"></i>
                      <span>Managers</span>
                    </a>
                  </li>
                  <li>
                    <a href="/users_waiters">
                      <i class="bi bi-circle"></i>
                      <span>Waiters</span>
                    </a>
                  </li>
                  <li>
                    <a href="/users_chefs">
                      <i class="bi bi-circle"></i>
                      <span>Chefs</span>
                    </a>
                  </li>
                </>
              )}
              {role <= 3 && (
                <li>
                  <a href="/users_customers">
                    <i class="bi bi-circle"></i>
                    <span>Customers</span>
                  </a>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* tables */}
        {role <= 2 && (
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-layout-text-window-reverse"></i>
              <span>Tables</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="tables-nav"
              class="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/table_details">
                  <i class="bi bi-circle"></i>
                  <span>Manage</span>
                </a>
              </li>
              <li>
                <a href="/table_bookings">
                  <i class="bi bi-circle"></i>
                  <span>Bookings</span>
                </a>
              </li>
            </ul>
          </li>
        )}

        {/* orders */}
        {role < 4 && (
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-gem"></i>
              <span>Orders</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="icons-nav"
              class="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              {role <= 2 && (
                <li>
                  <a href="/orders_past">
                    <i class="bi bi-circle"></i>
                    <span>Past</span>
                  </a>
                </li>
              )}
              {role <= 3 && (
                <li>
                  <a href="/orders_current">
                    <i class="bi bi-circle"></i>
                    <span>Current</span>
                  </a>
                </li>
              )}
              <li>
                <a href="/itemorders">
                  <i class="bi bi-circle"></i>
                  <span>Table Menu Orders</span>
                </a>
              </li>
            </ul>
          </li>
        )}

        {/* feedback */}
        {role <= 2 && (
          <>
            <li class="nav-item">
              <Link class="nav-link collapsed" to="/feedback">
                <i class="bi bi-twitch"></i>
                <span>Feedback</span>
              </Link>
            </li>

            {/* contect us */}
            <li class="nav-item">
              <Link class="nav-link collapsed" to="/contact_us">
                <i class="bi bi-chat"></i>
                <span>Contact Us</span>
              </Link>
            </li>
          </>
        )}

        {/* chef kitchen */}
        {(role <= 2 || role === 4) && (
          <li class="nav-item">
            <Link class="nav-link collapsed" to="/kitchen">
              <i class="bi bi-basket"></i>
              <span>Kitchen</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
